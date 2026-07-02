import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

const INVESTOR_RECIPIENT = "selection@jalour.com";

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = str(body?.name);
  const phone = str(body?.phone);
  const email = str(body?.email);
  const address = str(body?.address);
  const occupation = str(body?.occupation);
  const education = str(body?.education);
  const socialLinks = str(body?.socialLinks);
  const budget = str(body?.budget);
  const liquidity = str(body?.liquidity);
  const otherProjects = str(body?.otherProjects);
  const objective = str(body?.objective);
  const clubMemberships = str(body?.clubMemberships);
  const spouseName = str(body?.spouseName);
  const spouseOccupation = str(body?.spouseOccupation);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !phone || !emailOk || !occupation || !education || !budget || !liquidity || !objective) {
    return NextResponse.json(
      { error: "Please complete all required fields before continuing." },
      { status: 400 }
    );
  }

  const lines = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Address", address],
    ["Occupation", occupation],
    ["Education", education],
    ["Social Media", socialLinks],
    ["Budget", budget],
    ["Liquid Capital", liquidity],
    ["Objective", objective],
    ["Other Investments", otherProjects],
    ["Club Memberships", clubMemberships],
    ["Spouse / Partner Name", spouseName],
    ["Spouse / Partner Occupation", spouseOccupation],
  ].filter(([, v]) => v);

  try {
    await sendMail({
      to: INVESTOR_RECIPIENT,
      replyTo: email,
      subject: `NURV investor application — ${name}`,
      text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });
  } catch (err) {
    console.error("Failed to send investor application email:", err);
    return NextResponse.json(
      { error: "Something went wrong submitting your application. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
