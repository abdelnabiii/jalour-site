import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
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
    "SELECT id, name, email FROM investor_applications WHERE id = ?",
    [id]
  );
  const application = rows[0];
  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  await pool.query(
    "UPDATE investor_applications SET status = 'declined', decided_at = NOW() WHERE id = ?",
    [id]
  );

  try {
    await sendMail({
      to: application.email,
      subject: "NURV Investor Application — Update",
      text: [
        `Hi ${application.name},`,
        "",
        "Thank you for your interest in NURV. Based on your profile, this opportunity may not be the right fit at this stage.",
        "",
        "Our team will follow up if a suitable opportunity arises. You can also reach us on 17836.",
        "",
        "— JALOUR",
      ].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send decline email:", err);
  }

  return NextResponse.json({ ok: true });
}
