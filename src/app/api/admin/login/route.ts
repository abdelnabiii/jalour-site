import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSessionToken } from "@/lib/auth";

const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  const a = Buffer.from(password);
  const b = Buffer.from(adminPassword);
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!valid) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createSessionToken({ role: "admin" }, SESSION_MAX_AGE);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
