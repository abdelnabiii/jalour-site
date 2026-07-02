import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("investor_session")?.value;
  const session = verifySessionToken<{ applicantId: number; email: string }>(token);
  if (!session) {
    return NextResponse.redirect(new URL("/investor", request.url));
  }

  const filePath = path.join(process.cwd(), "src/content/nurv-dashboard.html");
  const html = await readFile(filePath, "utf8");
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
