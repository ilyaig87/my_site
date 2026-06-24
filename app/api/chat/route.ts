import { NextRequest, NextResponse } from 'next/server';
import { turso } from '@/lib/turso';
import { getSiteContent } from '@/lib/data';
import packagesData from '@/data/packages.json';

// ── Tunables (change these to control cost) ────────────────────────────────
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const MAX_OUTPUT_TOKENS = 400; // caps cost of each reply
const MAX_INPUT_CHARS = 500; // per user message
const MAX_HISTORY = 8; // only the last N turns are sent to the model
const PER_IP_HOURLY_LIMIT = 30; // stops the "1000 messages" abuse
const GLOBAL_DAILY_LIMIT = 1000; // hard daily ceiling (kill switch)
// ───────────────────────────────────────────────────────────────────────────

const FALLBACK_WA = 'https://wa.me/972546361555';

let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await turso.execute(
    `CREATE TABLE IF NOT EXISTS chat_usage (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, updated_at TEXT)`
  );
  tableReady = true;
}

/** Increment a usage bucket and return the new count. Fails open (returns 0) on DB error. */
async function bump(bucket: string): Promise<number> {
  try {
    await turso.execute({
      sql: `INSERT INTO chat_usage (bucket, count, updated_at) VALUES (?, 1, ?)
            ON CONFLICT(bucket) DO UPDATE SET count = count + 1, updated_at = ?`,
      args: [bucket, new Date().toISOString(), new Date().toISOString()],
    });
    const res = await turso.execute({ sql: `SELECT count FROM chat_usage WHERE bucket = ?`, args: [bucket] });
    return Number(res.rows[0]?.count ?? 0);
  } catch {
    return 0; // never block the chat because of a DB hiccup
  }
}

function buildKnowledge(): string {
  const content = getSiteContent();
  const pkgs = (packagesData as Array<{ name: string; price: number; priceFrom?: boolean; description: string; features: string[]; notIncluded?: string[] }>);
  const pkgText = pkgs
    .map((p) => {
      const price = p.priceFrom ? `החל מ-${p.price.toLocaleString('he-IL')} ₪` : `${p.price.toLocaleString('he-IL')} ₪`;
      const inc = p.features.join('; ');
      const exc = p.notIncluded?.length ? ` | לא כלול: ${p.notIncluded.join('; ')}` : '';
      return `• ${p.name} — ${price}: ${p.description} כולל: ${inc}${exc}`;
    })
    .join('\n');

  return `מידע על Pixelia (סטודיו לבניית אתרים ומערכות AI/אוטומציה לעסקים):

חבילות תמחור (חד-פעמי):
${pkgText}

שירותים: אתרים (דף נחיתה, אתר תדמית, אתר מתקדם), תבניות מוכנות, ומערכות AI ואוטומציה (צ'אטבוטים, אוטומציות עסקיות, סוכני AI, אינטגרציות).
זמני ביצוע: Starter 5-7 ימים, Business 1-2 שבועות, Premium 2-4 שבועות.
דומיין ואחסון: 300 ₪/שנה כתוספת. הקוד והדומיין בבעלות הלקוח.
יצירת קשר: טלפון ${content.contact.phone}, וואטסאפ ${FALLBACK_WA}, מייל ${content.contact.email}.`;
}

const SYSTEM_INSTRUCTION = `אתה העוזר החכם של Pixelia — סטודיו ישראלי לבניית אתרים ומערכות AI/אוטומציה לעסקים.
ענה תמיד בעברית, בקצרה, בידידותיות ובמקצועיות. השתמש אך ורק במידע שמסופק לך למטה.
כללים:
- אל תמציא מחירים, נתונים או הבטחות. אם אינך יודע — אמור זאת והצע לחבר את הלקוח לצחי בוואטסאפ.
- מחירים הם נקודת התחלה; אל תיתן הצעת מחיר סופית מחייבת — תן טווח/חבילה מתאימה והצע שיחה.
- כשלקוח מתעניין, עודד אותו בעדינות להשאיר שם וטלפון או לפנות בוואטסאפ.
- אל תענה על נושאים שאינם קשורים ל-Pixelia ולשירותיה. החזר בנימוס לנושא.
- תשובות קצרות (2-4 משפטים בדרך כלל).`;

interface ClientMessage {
  role: 'user' | 'model';
  content: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: `הצ'אט החכם עדיין בהגדרה אצלנו 🙂 בינתיים אפשר לבחור שאלה מהרשימה, או לדבר איתנו ישירות בוואטסאפ: ${FALLBACK_WA}`,
    });
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: 'no messages' }, { status: 400 });
  }

  // ── Rate limiting (server-side, can't be bypassed from the browser) ──
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const now = new Date();
  const hourKey = now.toISOString().slice(0, 13).replace(/[-T:]/g, '');
  const dayKey = now.toISOString().slice(0, 10).replace(/-/g, '');
  await ensureTable();

  const ipCount = await bump(`ip:${ip}:${hourKey}`);
  if (ipCount > PER_IP_HOURLY_LIMIT) {
    return NextResponse.json({
      reply: `הגענו למקסימום ההודעות לשעה הזו 🙏 כדי שנמשיך — השאירו שם וטלפון ונחזור אליכם, או דברו איתנו ישירות בוואטסאפ: ${FALLBACK_WA}`,
      limited: true,
    });
  }

  const globalCount = await bump(`global:${dayKey}`);
  if (globalCount > GLOBAL_DAILY_LIMIT) {
    return NextResponse.json({
      reply: `הצ'אט עמוס כרגע 🙏 השאירו פרטים ונחזור אליכם, או דברו איתנו בוואטסאפ: ${FALLBACK_WA}`,
      limited: true,
    });
  }

  // ── Build the request to Gemini (trimmed + capped) ──
  const trimmed = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.content || '').slice(0, MAX_INPUT_CHARS) }],
  }));

  const payload = {
    systemInstruction: { parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${buildKnowledge()}` }] },
    contents: trimmed,
    generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.5 },
  };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error('[chat] Gemini error', res.status, await res.text().catch(() => ''));
      return NextResponse.json({
        reply: `מצטער, יש לי תקלה רגעית 🙏 נסו שוב בעוד רגע, או דברו איתנו בוואטסאפ: ${FALLBACK_WA}`,
      });
    }

    const data = await res.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') ||
      `לא הצלחתי לנסח תשובה כרגע. אפשר לדבר איתנו בוואטסאפ: ${FALLBACK_WA}`;

    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    console.error('[chat] request failed', error);
    return NextResponse.json({
      reply: `יש בעיית תקשורת רגעית 🙏 נסו שוב מאוחר יותר, או דברו איתנו בוואטסאפ: ${FALLBACK_WA}`,
    });
  }
}
