"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationActions({ id, status }: { id: number; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  async function act(action: "approve" | "decline") {
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch(`/api/admin/applications/${id}/${action}`, { method: "POST" });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setNotice(body?.accessCode ? `${body.error} Code: ${body.accessCode}` : body?.error || "Something went wrong.");
        return;
      }
      router.refresh();
    } catch {
      setNotice("Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (status !== "pending") {
    return notice ? <span style={{ color: "#e05555" }}>{notice}</span> : null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => act("approve")}
          disabled={busy}
          style={{ background: "#2E7CCC", border: "1px solid #2E7CCC", color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 10, textTransform: "uppercase", padding: "6px 10px", cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1 }}
        >
          Approve
        </button>
        <button
          onClick={() => act("decline")}
          disabled={busy}
          style={{ background: "transparent", border: "1px solid #6b6b6b", color: "#6b6b6b", fontFamily: "'Space Mono', monospace", fontSize: 10, textTransform: "uppercase", padding: "6px 10px", cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1 }}
        >
          Decline
        </button>
      </div>
      {notice && <span style={{ color: "#e05555", fontSize: 10 }}>{notice}</span>}
    </div>
  );
}
