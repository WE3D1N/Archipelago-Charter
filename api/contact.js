import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const escape = (str) =>
  String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstname, lastname, email, phone, date, guests, message, website } =
    req.body || {};

  // Honeypot: reject silently if filled by a bot
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Server-side validation
  if (
    !firstname ||
    typeof firstname !== 'string' ||
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  try {
    await resend.emails.send({
      from: 'Archipelago Charter <mail@mail.rivercat.se>',
      to: 'mikael@onsea.se',
      replyTo: email,
      subject: `Ny bokningsförfrågan — ${escape(firstname)} ${escape(lastname)}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0d1b2a;">
          <h2 style="color:#000a1e;border-bottom:2px solid #fc8a40;padding-bottom:0.5rem;">
            Ny bokningsförfrågan
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-top:1rem;">
            <tr>
              <td style="padding:0.5rem 0;font-weight:700;width:40%;">Namn</td>
              <td style="padding:0.5rem 0;">${escape(firstname)} ${escape(lastname)}</td>
            </tr>
            <tr style="background:#f8f9fa;">
              <td style="padding:0.5rem 0.5rem;font-weight:700;">E-post</td>
              <td style="padding:0.5rem 0.5rem;">
                <a href="mailto:${escape(email)}">${escape(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0.5rem 0;font-weight:700;">Telefon</td>
              <td style="padding:0.5rem 0;">${escape(phone) || '—'}</td>
            </tr>
            <tr style="background:#f8f9fa;">
              <td style="padding:0.5rem 0.5rem;font-weight:700;">Datum</td>
              <td style="padding:0.5rem 0.5rem;">${escape(date) || '—'}</td>
            </tr>
            <tr>
              <td style="padding:0.5rem 0;font-weight:700;">Antal personer</td>
              <td style="padding:0.5rem 0;">${escape(guests) || '—'}</td>
            </tr>
          </table>
          ${
            message
              ? `<h3 style="margin-top:1.5rem;">Meddelande</h3>
                 <p style="background:#f8f9fa;padding:1rem;border-radius:0.5rem;line-height:1.6;">
                   ${escape(message).replace(/\n/g, '<br>')}
                 </p>`
              : ''
          }
          <p style="margin-top:2rem;font-size:0.8rem;color:#6b7280;">
            Skickat via bokningsformuläret på archipelagocharter.se
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
