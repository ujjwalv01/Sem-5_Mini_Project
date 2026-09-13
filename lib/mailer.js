import nodemailer from 'nodemailer';

// ─── Gmail SMTP transporter ──────────────────────────────────────────────
// Uses a Gmail account + App Password (see project setup notes).
// Requires two env vars: EMAIL_USER and EMAIL_APP_PASSWORD.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export async function sendOTPEmail(to, code) {
    return transporter.sendMail({
        from: `MedSpace <${process.env.EMAIL_USER}>`,
        to,
        subject: `${code} — Your MedSpace verification code`,
        html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #0d9488, #0f766e); 
                      padding: 12px 24px; border-radius: 12px;">
            <span style="color: white; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
              MedSpace
            </span>
          </div>
        </div>

        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px;">
          <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #111827;">
            Your verification code
          </h2>
          <p style="margin: 0 0 32px; color: #6b7280; font-size: 15px;">
            Enter this code to sign in to your MedSpace account.
          </p>

          <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; 
                      padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 42px; font-weight: 800; letter-spacing: 12px; 
                         color: #0d9488; font-family: monospace;">
              ${code}
            </span>
          </div>

          <p style="margin: 0; color: #9ca3af; font-size: 13px; text-align: center;">
            ⏱ This code expires in <strong>10 minutes</strong>.<br/>
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>

        <p style="text-align: center; color: #d1d5db; font-size: 12px; margin-top: 24px;">
          © ${new Date().getFullYear()} MedSpace. All rights reserved.
        </p>
      </div>
    `,
    });
}
