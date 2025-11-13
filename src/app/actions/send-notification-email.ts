
'use server';

import * as nodemailer from 'nodemailer';

const adminEmail = "ceo@saasnext.in";

export async function sendNotificationEmail(subject: string, htmlBody: string, replyTo?: string) {
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials are not set. Skipping email notification.");
    return { success: false, message: "Server is not configured to send emails." };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"SaaSNext Platform" <${process.env.SMTP_FROM_EMAIL}>`,
    to: adminEmail,
    subject: subject,
    html: htmlBody,
  };

  if (replyTo) {
    mailOptions.replyTo = replyTo;
  }

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Notification sent." };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, message: 'Sorry, something went wrong while sending the notification.' };
  }
}
