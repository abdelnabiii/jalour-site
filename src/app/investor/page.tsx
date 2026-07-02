"use client";

import { useState } from "react";

// Change this to update the dashboard access password
const DASHBOARD_PASSWORD = "NURV2026";

type Stage = "form" | "verify" | "dashboard";

const GOALS = [
  { value: "income", label: "Monthly passive income" },
  { value: "growth", label: "Long-term capital growth" },
  { value: "both", label: "Income and growth equally" },
  { value: "preserve", label: "Wealth preservation" },
];

const BUDGETS = [
  "EGP 179,000 – 300,000 (1 share)",
  "EGP 300,000 – 600,000 (1–2 shares)",
  "EGP 600,000 – 1,200,000 (2–4 shares)",
  "EGP 1,200,000+ (multiple units)",
];

export default function InvestorPage() {
  const [stage, setStage] = useState<Stage>("form");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [formError, setFormError] = useState("");

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name.trim() || !emailOk || !phone.trim() || !goal || !budget) {
      setFormError("Please complete all fields before continuing.");
      return;
    }
    setFormError("");
    // In production: send lead data to CRM/webhook here
    console.log("NURV investor lead:", { name, email, phone, goal, budget });
    setStage("verify");
    setPasswordInput(DASHBOARD_PASSWORD); // auto-fill so user just clicks confirm
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
      setPasswordError(false);
      setStage("dashboard");
    } else {
      setPasswordError(true);
    }
  }

  if (stage === "dashboard") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#0B0A0B" }}>
        <iframe
          src="/nurv-dashboard.html"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          title="NURV Investor Dashboard"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0A0B",
        color: "#fff",
        fontFamily: "'Space Grotesk', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            NURV
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "#2E7CCC",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            by JALOUR® — Investor Dashboard
          </div>
        </div>

        {stage === "form" && (
          <>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: "#2E7CCC",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Access Request
            </div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.15,
                marginBottom: 10,
              }}
            >
              Get Your Investor Access
            </h1>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              Tell us about your investment interest to unlock the full pricing, ROI
              calculator, and scenario analysis dashboard.
            </p>

            <form onSubmit={handleFormSubmit}>
              <Field label="Full Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  style={inputStyle}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 1XX XXX XXXX"
                  style={inputStyle}
                />
              </Field>

              <Field label="Investment Objective">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {GOALS.map((g) => (
                    <label
                      key={g.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        border: `1px solid ${goal === g.value ? "#2E7CCC" : "#2A292A"}`,
                        background: goal === g.value ? "rgba(46,124,204,0.08)" : "#0B0A0B",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={g.value}
                        checked={goal === g.value}
                        onChange={() => setGoal(g.value)}
                        style={{ accentColor: "#2E7CCC" }}
                      />
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 11,
                          color: goal === g.value ? "#fff" : "#6b6b6b",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {g.label}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Approximate Budget">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">— Select your range —</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>

              {formError && (
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    color: "#e05555",
                    marginBottom: 16,
                  }}
                >
                  {formError}
                </p>
              )}

              <button type="submit" style={primaryBtn}>
                Get Dashboard Access →
              </button>
            </form>
          </>
        )}

        {stage === "verify" && (
          <>
            <div
              style={{
                padding: "20px 24px",
                border: "1px solid #1a4a7a",
                background: "rgba(46,124,204,0.08)",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "#2E7CCC",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Access Granted — Welcome, {name.split(" ")[0]}
              </div>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                }}
              >
                Your access code is ready below. Our team will also reach out within
                one business day with a personalised recommendation.
              </p>
            </div>

            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#6b6b6b",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Your Dashboard Access Code
            </div>
            <div
              style={{
                padding: "16px 20px",
                border: "1px solid #2A292A",
                background: "#1A191A",
                fontFamily: "'Space Mono', monospace",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "#C8A96E",
                marginBottom: 28,
                textAlign: "center",
              }}
            >
              {DASHBOARD_PASSWORD}
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <Field label="Enter Access Code to Continue">
                <input
                  type="text"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value.toUpperCase());
                    setPasswordError(false);
                  }}
                  placeholder="Access code"
                  style={{
                    ...inputStyle,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    ...(passwordError ? { borderColor: "#e05555" } : {}),
                  }}
                />
              </Field>
              {passwordError && (
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    color: "#e05555",
                    marginBottom: 16,
                  }}
                >
                  Incorrect code. Please try again.
                </p>
              )}
              <button type="submit" style={primaryBtn}>
                Open Dashboard →
              </button>
              <button
                type="button"
                onClick={() => setStage("form")}
                style={{
                  ...primaryBtn,
                  background: "transparent",
                  borderColor: "#2A292A",
                  color: "#6b6b6b",
                  marginTop: 10,
                }}
              >
                ← Back
              </button>
            </form>
          </>
        )}

        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid #2A292A",
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#3a3a3a",
            letterSpacing: "0.08em",
            lineHeight: 1.8,
          }}
        >
          NURV MALL — AL SHOROUK · Powered by JALOUR®
          <br />
          Figures shown are illustrative. Not financial advice.
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "#6b6b6b",
          textTransform: "uppercase",
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0B0A0B",
  border: "1px solid #2A292A",
  color: "#fff",
  fontFamily: "'Space Mono', monospace",
  fontSize: 13,
  padding: "11px 13px",
  outline: "none",
  boxSizing: "border-box",
};

const primaryBtn: React.CSSProperties = {
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
  cursor: "pointer",
  marginTop: 8,
};
