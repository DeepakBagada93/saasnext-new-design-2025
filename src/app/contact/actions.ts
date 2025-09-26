
'use server';

import * as nodemailer from 'nodemailer';

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { message: 'All fields are required.', success: false };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: true, // Use a secure connection
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_API_KEY,
    },
  });

  const mailOptions = {
    from: `"SaaSNext Contact Form" <${process.env.BREVO_SMTP_LOGIN}>`,
    to: process.env.CONTACT_FORM_EMAIL_TO,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Thank you for your message! We'll get back to you shortly.", success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { message: 'Sorry, something went wrong. Please try again later.', success: false };
  }
}
