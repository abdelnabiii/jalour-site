import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, generateAccessCode, hashPassword } from "@/lib/auth";
import { sendMail } from "@/lib/mailer";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

function isAdmin(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return verifySessionToken<{ role: string }>(token)?.role === "admin";
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const pool = await db();

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, email, status FROM investor_applications WHERE id = ?",
    [id]
  );
  const application = rows[0];
  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  const accessCode = generateAccessCode();
  const passwordHash = hashPassword(accessCode);

  await pool.query(
    "UPDATE investor_applications SET status = 'approved', password_hash = ?, decided_at = NOW() WHERE id = ?",
    [passwordHash, id]
  );

  try {
    await sendMail({
      to: application.email,
      subject: "Your NURV Investor Access Code",
      text: [
        `Hi ${application.name},`,
        "",
        "Your NURV investor application has been approved. Use the access code below, together with the email address you applied with, to open the investor dashboard at jalour.com/investor.",
        "",
        `Access code: ${accessCode}`,
        "",
        "This code is unique to your application — please keep it confidential.",
        "",
        "— JALOUR",
      ].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send access code email:", err);
    return NextResponse.json(
      {
        error: "Application approved, but the notification email failed to send. Share this access code manually — it will not be shown again.",
        accessCode,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
