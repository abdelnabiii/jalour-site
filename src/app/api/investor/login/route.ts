import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken } from "@/lib/auth";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

const SESSION_MAX_AGE = 60 * 60 * 2; // 2 hours

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password.trim() : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and access code." }, { status: 400 });
  }

  const pool = await db();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, email, password_hash FROM investor_applications WHERE email = ? AND status = 'approved'",
    [email]
  );
  const applicant = rows[0];

  if (!applicant || !applicant.password_hash || !verifyPassword(password, applicant.password_hash)) {
    return NextResponse.json({ error: "Incorrect email or access code." }, { status: 401 });
  }

  const token = createSessionToken({ applicantId: applicant.id, email: applicant.email }, SESSION_MAX_AGE);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("investor_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
