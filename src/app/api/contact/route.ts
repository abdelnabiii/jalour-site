import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

const CONTACT_RECIPIENT = "contact@jalour.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const project = typeof body?.project === "string" ? body.project.trim() : "";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and message." },
      { status: 400 }
    );
  }

  try {
    await sendMail({
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: project ? `Website enquiry — ${project}` : "Website enquiry",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        project ? `Project: ${project}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
