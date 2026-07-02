"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Login failed.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B0A0B", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
          JALOUR Admin
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 24 }}>
          Sign In
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          style={{
            width: "100%",
            background: "#0B0A0B",
            border: "1px solid #2A292A",
            color: "#fff",
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            padding: "11px 13px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: 16,
          }}
        />
        {error && <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#e05555", marginBottom: 16 }}>{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          style={{
            display: "block",
            width: "100%",
            background: "#2E7CCC",
            border: "1px solid #2E7CCC",
            color: "#fff",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "14px 20px",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
