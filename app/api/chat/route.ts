import { NextRequest, NextResponse } from 'next/server';
import { turso } from '@/lib/turso';
import { getSiteContent } from '@/lib/data';
import { sendLeadNotification } from '@/lib/email';
import packagesData from '@/data/packages.json';

// ── Tunables (change these to control cost / limits) ───────────────────────
// Model fallback chain: tries each in order until one works (handles a model
// name that isn't available for a given key/region).
const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
].filter(Boolean) as string[];

const MAX_OUTPUT_TOKENS = 400; // caps cost of each reply
const MAX_INPUT_CHARS = 500; // per user message
const MAX_HISTORY = 8; // only the last N turns are sent to the model
const PER_IP_HOURLY_LIMIT = 25; // per visitor, per hour
const PER_IP_DAILY_LIMIT = 60; // per visitor, per day
const GLOBAL_DAILY_LIMIT = 1500; // hard daily ceiling for the whole site (kill switch)
// ───────────────────────────────────────────────────────────────────────────

const FALLBACK_WA = 'https://wa.me/972546361555';

let tablesReady = false;
async function ensureTables() {
  if (tablesReady) return;
  await turso.execute(
    `CREATE TABLE IF NOT EXISTS chat_usage (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, updated_at TEXT)`
  );
  await turso.execute(
    `CREATE TABLE IF NOT EXISTS chat_leads (session TEXT PRIMARY KEY, phone TEXT, email TEXT, created_at TEXT)`
  );
  tablesReady = true;
}

/** Increment a usage bucket and return the new count. Fails open (0) on DB error. */
async function bump(bucket: string): Promise<number> {
  try {
    const ts = new Date().toISOString();
    await turso.execute({
      sql: `INSERT INTO chat_usage (bucket, count, updated_at) VALUES (?, 1, ?)
            ON CONFLICT(bucket) DO UPDATE SET count = count + 1, updated_at = ?`,
      args: [bucket, ts, ts],
    });
    const res = await turso.execute({ sql: `SELECT count FROM chat_usage WHERE bucket = ?`, args: [bucket] });
    return Number(res.rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

function extractPhone(text: string): string | null {
  const m = text.match(/0(?:5\d|7[0-9]|[2-489])[-\s.]?\d{3}[-\s.]?\d{4}/);
  return m ? m[0].replace(/[-\s.]/g, '') : null;
}

function extractEmail(text: string): string | null {
  const m = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return m ? m[0] : null;
}

function extractName(text: string): string | null {
  const m = text.match(/(?:קוראים לי|שמי|השם שלי|אני)\s+([֐-׿]{2,}(?:\s[֐-׿]{2,})?)/);
  return m ? m[1].trim() : null;
}

interface ClientMessage {
  role: 'user' | 'model';
  content: string;
}

/** If the visitor left a phone/email in the chat, save the lead once per session
 *  and email the owner. Best-effort — never blocks the conversation. */
async function maybeCaptureLead(session: string, messages: ClientMessage[]) {
  if (!session) return;
  const userTexts = messages.filter((m) => m.role === 'user').map((m) => m.content);
  const joined = userTexts.join('\n');
  const phone = extractPhone(joined);
  const email = extractEmail(joined);
  if (!phone && !email) return;

  // Dedupe: one lead email per chat session.
  const existing = await turso.execute({ sql: `SELECT session FROM chat_leads WHERE session = ?`, args: [session] });
  if (existing.rows.length > 0) return;

  await turso.execute({
    sql: `INSERT INTO chat_leads (session, phone, email, created_at) VALUES (?, ?, ?, ?)`,
    args: [session, phone || '', email || '', new Date().toISOString()],
  });

  const transcript = messages
    .slice(-8)
    .map((m) => `${m.role === 'user' ? 'לקוח' : 'בוט'}: ${m.content}`)
    .join('\n');

  await sendLeadNotification({
    subject: 'ליד חדש מהצ\'אטבוט 🤖',
    replyTo: email || undefined,
    rows: [
      { label: 'שם', value: extractName(joined) || 'לא צוין' },
      { label: 'טלפון', value: phone || '' },
      { label: 'אימייל', value: email || '' },
      { label: 'מקור', value: 'צ\'אטבוט באתר' },
    ],
    note: transcript,
  });
}

async function callGemini(apiKey: string, payload: object): Promise<{ text?: string; error?: string }> {
  let lastError = '';
  for (const model of MODEL_CANDIDATES) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      );
      if (res.ok) {
        const data = await res.json();
        const text: string =
          data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || '';
        if (text.trim()) return { text: text.trim() };
        lastError = `${model}: empty response (${JSON.stringify(data).slice(0, 200)})`;
        console.error('[chat] Gemini', lastError);
        continue;
      }
      const errBody = await res.text().catch(() => '');
      lastError = `${model} -> ${res.status}: ${errBody.slice(0, 250)}`;
      console.error('[chat] Gemini', lastError);
      // 404 = model not available for this key; try the next candidate.
      if (res.status === 404) continue;
      // Other errors (auth/quota/bad request) won't be fixed by another model.
      return { error: lastError };
    } catch (e) {
      lastError = `${model} exception: ${String(e).slice(0, 180)}`;
      console.error('[chat] Gemini', lastError);
    }
  }
  return { error: lastError || 'all models failed' };
}

function buildKnowledge(): string {
  const content = getSiteContent();
  const pkgs = packagesData as Array<{
    name: string; price: number; priceFrom?: boolean; customQuote?: boolean; description: string; features: string[]; notIncluded?: string[];
  }>;
  const pkgText = pkgs
    .map((p) => {
      const price = p.customQuote
        ? 'הצעת מחיר מותאמת אישית (לפי היקף וצרכים — הצעה מדויקת תוך 24 שעות)'
        : p.priceFrom
          ? `החל מ-${p.price.toLocaleString('he-IL')} ₪`
          : `${p.price.toLocaleString('he-IL')} ₪`;
      const exc = p.notIncluded?.length ? ` | לא כלול: ${p.notIncluded.join('; ')}` : '';
      return `• ${p.name} — ${price}: ${p.description} כולל: ${p.features.join('; ')}${exc}`;
    })
    .join('\n');

  return `מידע על Pixelia (סטודיו לבניית אתרים ומערכות AI/אוטומציה לעסקים):

חבילות תמחור (חד-פעמי):
${pkgText}

שירותים: אתרים (דף נחיתה, אתר תדמית, אתר מתקדם), תבניות מוכנות, סוכני AI (AI Agents — עובדים דיגיטליים שעונים ללקוחות ומבצעים משימות), צ'אטבוטים חכמים, אוטומציות עסקיות ואינטגרציות AI. עמודים רלוונטיים: /ai, /services/ai-agents, /services/business-automation, /services/ai-chatbot.
זמני ביצוע: Starter 5-7 ימים, Business 1-2 שבועות, Premium 2-4 שבועות.
דומיין ואחסון: 300 ₪/שנה כתוספת. הקוד והדומיין בבעלות הלקוח.
שפות: הצוות דובר עברית ורוסית — ניתן לקבל שירות וליווי מלא בשתי השפות (мы говорим по-русски). עמוד ברוסית: https://www.pixelia.co.il/ru
יצירת קשר: טלפון ${content.contact.phone}, וואטסאפ ${FALLBACK_WA}, מייל ${content.contact.email}.`;
}

const SYSTEM_INSTRUCTION = `אתה העוזר החכם של Pixelia — סטודיו ישראלי לבניית אתרים ומערכות AI/אוטומציה לעסקים.
ענה בשפה שבה הלקוח פונה אליך: אם כתב בעברית — ענה בעברית; אם כתב ברוסית — ענה ברוסית. Pixelia נותנת שירות מלא בעברית וברוסית, אז אל תהסס לעזור ללקוחות דוברי רוסית בשפתם.
ענה בקצרה, בידידותיות ובמקצועיות. השתמש אך ורק במידע שמסופק לך למטה.
כללים:
- אל תמציא מחירים, נתונים או הבטחות. אם אינך יודע — אמור זאת והצע לחבר את הלקוח לצחי בוואטסאפ.
- מחירים הם נקודת התחלה; אל תיתן הצעת מחיר סופית מחייבת — תן טווח/חבילה מתאימה והצע שיחה.
- כשלקוח מתעניין, עודד אותו בעדינות להשאיר שם וטלפון כדי שנחזור אליו, או לפנות בוואטסאפ.
- אל תענה על נושאים שאינם קשורים ל-Pixelia ולשירותיה. החזר בנימוס לנושא.
- תשובות קצרות (2-4 משפטים בדרך כלל).`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: `הצ'אט החכם עדיין בהגדרה אצלנו 🙂 בינתיים אפשר לבחור שאלה מהרשימה, או לדבר איתנו ישירות בוואטסאפ: ${FALLBACK_WA}`,
    });
  }

  let body: { messages?: ClientMessage[]; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  if (messages.length === 0) {
    return NextResponse.json({ error: 'no messages' }, { status: 400 });
  }

  // ── Rate limiting (server-side, can't be bypassed from the browser) ──
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const now = new Date();
  const hourKey = now.toISOString().slice(0, 13).replace(/[-T:]/g, '');
  const dayKey = now.toISOString().slice(0, 10).replace(/-/g, '');
  await ensureTables();

  if ((await bump(`ip:${ip}:h:${hourKey}`)) > PER_IP_HOURLY_LIMIT ||
      (await bump(`ip:${ip}:d:${dayKey}`)) > PER_IP_DAILY_LIMIT) {
    return NextResponse.json({
      reply: `הגענו למקסימום ההודעות 🙏 כדי שנמשיך — השאירו שם וטלפון ונחזור אליכם, או דברו איתנו בוואטסאפ: ${FALLBACK_WA}`,
      limited: true,
    });
  }
  if ((await bump(`global:${dayKey}`)) > GLOBAL_DAILY_LIMIT) {
    return NextResponse.json({
      reply: `הצ'אט עמוס כרגע 🙏 השאירו פרטים ונחזור אליכם, או דברו איתנו בוואטסאפ: ${FALLBACK_WA}`,
      limited: true,
    });
  }

  // ── Capture a lead if the visitor left contact details (best-effort) ──
  try {
    await maybeCaptureLead(sessionId, messages);
  } catch (e) {
    console.error('[chat] lead capture failed', e);
  }

  // ── Ask Gemini ──
  // Gemini requires the conversation to START with a 'user' turn, so drop any
  // leading 'model' messages (e.g. the bot's welcome message).
  const contents = messages
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(m.content || '').slice(0, MAX_INPUT_CHARS) }],
    }));
  while (contents.length && contents[0].role !== 'user') {
    contents.shift();
  }
  if (contents.length === 0) {
    return NextResponse.json({ error: 'no user message' }, { status: 400 });
  }

  const payload = {
    systemInstruction: { parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${buildKnowledge()}` }] },
    contents,
    generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.5 },
  };

  const result = await callGemini(apiKey, payload);
  if (result.text) {
    return NextResponse.json({ reply: result.text });
  }

  console.error('[chat] Gemini failed:', result.error);
  return NextResponse.json({
    reply: `מצטער, יש לי תקלה רגעית 🙏 נסו שוב בעוד רגע, או דברו איתנו בוואטסאפ: ${FALLBACK_WA}`,
  });
}
