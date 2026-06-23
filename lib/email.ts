import { Resend } from 'resend';

/**
 * Email sending via Resend.
 *
 * Required environment variables (set them in Vercel → Project → Settings →
 * Environment Variables, and locally in .env.local):
 *
 *   RESEND_API_KEY            – your Resend API key (starts with "re_")
 *   RESEND_FROM               – the verified sender, e.g. "Pixelia <noreply@pixelia.co.il>".
 *                               Until your domain is verified in Resend you can use
 *                               "Pixelia <onboarding@resend.dev>" (test sender — it only
 *                               delivers to the email address of your own Resend account).
 *   CONTACT_NOTIFICATION_EMAIL – where lead notifications are sent (defaults below).
 *
 * If RESEND_API_KEY is missing, sending is skipped gracefully so form
 * submissions are still saved to the database.
 */

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.RESEND_FROM || 'Pixelia <onboarding@resend.dev>';
const NOTIFY_TO = process.env.CONTACT_NOTIFICATION_EMAIL || 'ilyaig8@gmail.com';

export type SendResult =
  | { sent: true; id: string | null }
  | { sent: false; reason: 'no-api-key' | 'resend-error' | 'exception'; error?: unknown };

interface LeadNotificationInput {
  subject: string;
  /** Pre-built rows of label → value to render in the email body. */
  rows: { label: string; value: string }[];
  /** Address to set as Reply-To, so you can reply straight to the lead. */
  replyTo?: string;
  /** Optional free-text block (e.g. the message). */
  note?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEmail(rows: { label: string; value: string }[], note?: string): string {
  const rowsHtml = rows
    .filter((r) => r.value)
    .map(
      (r) => `
        <tr>
          <td style="padding:8px 12px;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
            r.label,
          )}</td>
          <td style="padding:8px 12px;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(
            r.value,
          )}</td>
        </tr>`,
    )
    .join('');

  const noteHtml = note
    ? `<div style="margin-top:16px;padding:12px 14px;background:#f8fafc;border-radius:10px;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
        note,
      )}</div>`
    : '';

  return `
  <div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#ffffff;">
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:18px;">פנייה חדשה מאתר Pixelia</h2>
    <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      ${rowsHtml}
    </table>
    ${noteHtml}
    <p style="margin-top:20px;color:#94a3b8;font-size:12px;">הודעה זו נשלחה אוטומטית מטופס באתר.</p>
  </div>`;
}

export async function sendLeadNotification(input: LeadNotificationInput): Promise<SendResult> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping email notification');
    return { sent: false, reason: 'no-api-key' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: input.subject,
      html: renderEmail(input.rows, input.note),
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    });

    if (error) {
      console.error('[email] Resend returned an error:', error);
      return { sent: false, reason: 'resend-error', error };
    }

    return { sent: true, id: data?.id ?? null };
  } catch (error) {
    console.error('[email] Failed to send via Resend:', error);
    return { sent: false, reason: 'exception', error };
  }
}
