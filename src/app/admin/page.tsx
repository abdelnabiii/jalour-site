import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import ApplicationActions from "./ApplicationActions";

export const dynamic = "force-dynamic";

type Application = {
  id: number;
  name: string;
  phone: string;
  email: string;
  budget: string;
  liquidity: string;
  objective: string;
  status: "pending" | "approved" | "declined";
  created_at: string;
};

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = verifySessionToken<{ role: string }>(token);
  if (session?.role !== "admin") {
    redirect("/admin/login");
  }
}

export default async function AdminPage() {
  await requireAdmin();

  const pool = await db();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, phone, email, budget, liquidity, objective, status, created_at FROM investor_applications ORDER BY created_at DESC"
  );
  const applications = rows as Application[];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0A0B", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", padding: "48px 32px" }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
        JALOUR Admin
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 32 }}>
        NURV Investor Applications
      </h1>

      {applications.length === 0 ? (
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#6b6b6b" }}>No applications yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Space Mono', monospace", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2A292A", textAlign: "left" }}>
                {["Date", "Name", "Phone", "Email", "Budget", "Liquidity", "Objective", "Status", "Action"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} style={{ borderBottom: "1px solid #1c1b1c" }}>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap", color: "#6b6b6b" }}>
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px 12px" }}>{app.name}</td>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{app.phone}</td>
                  <td style={{ padding: "10px 12px" }}>{app.email}</td>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{app.budget}</td>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{app.liquidity}</td>
                  <td style={{ padding: "10px 12px" }}>{app.objective}</td>
                  <td style={{ padding: "10px 12px", textTransform: "uppercase", color: app.status === "approved" ? "#2E7CCC" : app.status === "declined" ? "#e05555" : "#C8A96E" }}>
                    {app.status}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <ApplicationActions id={app.id} status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
