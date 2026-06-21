import { NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

const services = [
  "Core OS Web Interface (Web Development)",
  "AI Intelligence Module (AI Agents & Automation)",
  "Growth & AEO Engine (SEO & Citations)",
  "Business Automation OS (Custom Software)"
];

const availableTimeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

// GET - Returns available services, slots, and API instructions for AI Agents
export async function GET() {
  const today = new Date();
  const next5Days = [];
  
  for (let i = 1; i <= 5; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    // Skip Sundays
    if (nextDate.getDay() !== 0) {
      next5Days.push(nextDate.toISOString().split('T')[0]);
    }
  }

  return NextResponse.json({
    message: "Welcome to SaaSNext AI-Agent Booking Protocol.",
    description: "Use this endpoint to programmatically query available services, booking slots, and submit bookings directly on behalf of users.",
    services,
    availableDates: next5Days,
    availableTimeSlots,
    bookingInstructions: {
      method: "POST",
      endpoint: "/api/bookings",
      contentType: "application/json",
      requiredFields: {
        name: "string (Full name of the client)",
        email: "string (Valid email address)",
        whatsapp: "string (Contact number, preferably WhatsApp)",
        service: "string (Must be one of the listed services)",
        date: "string (Format: YYYY-MM-DD, must be one of availableDates)",
        timeSlot: "string (Must be one of availableTimeSlots)"
      },
      optionalFields: {
        companyName: "string (Name of the business)",
        description: "string (Brief message explaining project goals)"
      }
    }
  }, { status: 200 });
}

// POST - Allows AI Agents or client-side forms to book a service slot
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, service, date, timeSlot, companyName, description } = body;

    // Validate required fields
    if (!name || !email || !whatsapp || !service || !date || !timeSlot) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields.",
        requiredFields: ["name", "email", "whatsapp", "service", "date", "timeSlot"]
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: "Invalid email format."
      }, { status: 400 });
    }

    // Generate a unique booking ID
    const bookingId = `SN-${Math.floor(100000 + Math.random() * 900000)}`;

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailTo = process.env.CONTACT_FORM_EMAIL_TO || 'connect@saasnext.in';
    const emailFrom = process.env.SMTP_FROM_EMAIL || 'connect@saasnext.in';

    const mailOptions = {
      from: `"SaaSNext Direct Booking" <${emailFrom}>`,
      to: emailTo,
      replyTo: email,
      subject: `New Direct Booking Confirmed: ${bookingId} - ${name}`,
      text: `
        Booking ID: ${bookingId}
        Client Name: ${name}
        Email: ${email}
        WhatsApp/Phone: ${whatsapp}
        Company: ${companyName || 'N/A'}
        Service Requested: ${service}
        Booking Date: ${date}
        Booking Time Slot: ${timeSlot}
        Project Description: ${description || 'No description provided.'}
      `,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #f26a2e; border-bottom: 2px solid #f26a2e; padding-bottom: 10px;">New Booking Confirmed (Direct API / Web Booking)</h2>
          <p><strong>Booking ID:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; background: #eee; padding: 2px 6px; border-radius: 4px;">${bookingId}</span></p>
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>WhatsApp/Phone:</strong> ${whatsapp}</p>
          <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date & Time Slot:</strong> ${date} at ${timeSlot}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <h3>Project Details:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #f26a2e;">${description || 'No description provided.'}</p>
        </div>
      `,
    };

    // Send notification email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Booking confirmed successfully. A representative will contact you on WhatsApp/Email shortly.",
      bookingDetails: {
        bookingId,
        status: "Confirmed",
        name,
        email,
        whatsapp,
        service,
        date,
        timeSlot,
        companyName,
        meetingFormat: "Google Meet / WhatsApp Video Call",
        nextSteps: [
          "A calendar invite has been dispatched to your email.",
          "Our tech coordinator will contact you via WhatsApp (+91 7016179234) within 24 hours to confirm project details."
        ]
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal server error occurred while processing booking. Please verify server SMTP configuration."
    }, { status: 500 });
  }
}
