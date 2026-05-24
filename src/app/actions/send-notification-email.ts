
'use server';

import * as nodemailer from 'nodemailer';
import { ADMIN_EMAILS } from '@/lib/constants';

// Multi-receiver support: Sends to both admin and optionally the client
export async function sendNotificationEmail(
  subject: string, 
  htmlBody: string, 
  replyTo?: string,
  ccClient?: string
) {
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials are not set. Skipping email notification.");
    return { success: false, message: "Server is not configured to send emails." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Admin Notification
  const adminMailOptions: nodemailer.SendMailOptions = {
    from: `"SaaSNext Platform" <${process.env.SMTP_FROM_EMAIL}>`,
    to: ADMIN_EMAILS.join(', '),
    subject: `[ADMIN] ${subject}`,
    html: htmlBody,
  };

  if (replyTo) {
    adminMailOptions.replyTo = replyTo;
  }

  try {
    // 1. Notify Admins
    await transporter.sendMail(adminMailOptions);

    // 2. Notify Client if ccClient is provided (Confirmation Email)
    if (ccClient) {
      const clientMailOptions: nodemailer.SendMailOptions = {
        from: `"SaaSNext" <${process.env.SMTP_FROM_EMAIL}>`,
        to: ccClient,
        subject: `Your SaaSNext Build: ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #f26a2e;">Build Received Successfully</h2>
            <p>Hello,</p>
            <p>Thank you for initiating your custom AI Business Stack build. Our team has received your configuration and is currently reviewing the technical requirements.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Configuration Summary:</strong></p>
              ${htmlBody}
            </div>
            <p>An automation engineer will contact you via WhatsApp or Email within 24 hours to finalize the initialization.</p>
            <hr />
            <p style="font-size: 12px; color: #888;">This is an automated confirmation from the SaaSNext Platform.</p>
          </div>
        `,
      };
      await transporter.sendMail(clientMailOptions);
    }

    return { success: true, message: "Notifications sent successfully." };
  } catch (error) {
    console.error('Email Dispatch Error:', error);
    return { success: false, message: 'Failed to dispatch one or more emails.' };
  }
}
