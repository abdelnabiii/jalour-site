"use client";

import { useState } from "react";

// Change this to update the dashboard access password
const DASHBOARD_PASSWORD = "NURV2026";

type Stage = "form" | "review" | "verify" | "dashboard" | "declined";

const mono: React.CSSProperties = { fontFamily: "'Space Mono', monospace" };

// Disqualifying answers — if any of these are selected the applicant is declined
const DISQUALIFY = {
  role: ["Student", "Employee — entry level"],
  budget: ["Below EGP 500,000"],
  portfolio: ["No — this would be my first investment"],
  liquidity: ["No available liquid capital"],
};

export default function InvestorPage() {
  const [stage, setStage] = useState<Stage>("form");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [liquidity, setLiquidity] = useState("");
  const [objective, setObjective] = useState("");

  function isDisqualified() {
    return (
      DISQUALIFY.role.includes(role) ||
      DISQUALIFY.budget.includes(budget) ||
      DISQUALIFY.portfolio.includes(portfolio) ||
      DISQUALIFY.liquidity.includes(liquidity)
    );
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name.trim() || !emailOk || !phone.trim() || !role || !budget || !portfolio || !liquidity || !objective) {
      setFormError("Please complete all fields before continuing.");
      return;
    }
    setFormError("");
    // In production: send lead data to CRM/webhook here
    console.log("NURV investor application:", { name, email, phone, role, company, budget, portfolio, liquidity, objective });
    setStage("review");
  }

  function handleReviewConfirm() {
    if (isDisqualified()) {
      setStage("declined");
    } else {
      setPasswordInput(DASHBOARD_PASSWORD);
      setStage("verify");
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
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
    <div style={{ minHeight: "100vh", background: "#0B0A0B", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase" }}>NURV</div>
          <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#2E7CCC", textTransform: "uppercase", marginTop: 4 }}>
            by JALOUR® — Private Investor Access
          </div>
        </div>

        {/* ── STAGE: APPLICATION FORM ── */}
        {stage === "form" && (
          <>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
              Investor Qualification
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 10 }}>
              Apply for Access
            </h1>
            <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: 36, maxWidth: 480 }}>
              NURV investor access is by application only. We review each submission to ensure our
              tools are matched to qualified investors. This takes under two minutes.
            </p>

            <form onSubmit={handleFormSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <Field label="Full Name">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={inputStyle} />
                </Field>
                <Field label="Phone">
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+20 1XX XXX XXXX" style={inputStyle} />
                </Field>
              </div>

              <Field label="Email Address">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
              </Field>

              <Divider label="Professional Background" />

              <Field label="Current Role / Position">
                <SelectField value={role} onChange={setRole} placeholder="— Select your position —">
                  <optgroup label="Executive & Ownership">
                    <option>CEO / Founder / Owner</option>
                    <option>C-Suite Executive (CFO, COO, CMO, etc.)</option>
                    <option>Managing Director / General Manager</option>
                    <option>Board Member / Chairman</option>
                  </optgroup>
                  <optgroup label="Professional">
                    <option>Senior Director / VP</option>
                    <option>Doctor / Lawyer / Architect</option>
                    <option>Investment / Finance Professional</option>
                    <option>Entrepreneur (active ventures)</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option>Employee — entry level</option>
                    <option>Student</option>
                    <option>Prefer not to say</option>
                  </optgroup>
                </SelectField>
              </Field>

              <Field label="Company / Organisation (optional)">
                <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Your company name" style={inputStyle} />
              </Field>

              <Divider label="Investment Profile" />

              <Field label="Investment Budget for This Project">
                <SelectField value={budget} onChange={setBudget} placeholder="— Select your range —">
                  <option>Below EGP 500,000</option>
                  <option>EGP 500,000 – 1,000,000</option>
                  <option>EGP 1,000,000 – 3,000,000</option>
                  <option>EGP 3,000,000 – 6,000,000</option>
                  <option>EGP 6,000,000+</option>
                </SelectField>
              </Field>

              <Field label="Existing Real Estate Investment Portfolio">
                <SelectField value={portfolio} onChange={setPortfolio} placeholder="— Select —">
                  <option>No — this would be my first investment</option>
                  <option>Yes — 1 to 2 properties</option>
                  <option>Yes — 3 to 5 properties</option>
                  <option>Yes — more than 5 properties</option>
                  <option>Yes — through a fund or company</option>
                </SelectField>
              </Field>

              <Field label="Available Liquid Capital for Immediate Investment">
                <SelectField value={liquidity} onChange={setLiquidity} placeholder="— Select —">
                  <option>No available liquid capital</option>
                  <option>Yes — available within 30 days</option>
                  <option>Yes — available immediately</option>
                </SelectField>
              </Field>

              <Field label="Primary Investment Objective">
                <SelectField value={objective} onChange={setObjective} placeholder="— Select your goal —">
                  <option>Monthly passive income (rental yield)</option>
                  <option>Long-term capital appreciation</option>
                  <option>Portfolio diversification</option>
                  <option>Inflation hedge / wealth preservation</option>
                  <option>Income and growth equally</option>
                </SelectField>
              </Field>

              {formError && (
                <p style={{ ...mono, fontSize: 11, color: "#e05555", marginBottom: 16 }}>{formError}</p>
              )}

              <button type="submit" style={primaryBtn}>Submit Application →</button>
            </form>

            <p style={{ ...mono, fontSize: 9, color: "#3a3a3a", letterSpacing: "0.06em", lineHeight: 1.8, marginTop: 28 }}>
              Applications are reviewed immediately. Qualifying investors receive dashboard access
              within this session. All information is kept strictly confidential.
            </p>
          </>
        )}

        {/* ── STAGE: REVIEW SUMMARY ── */}
        {stage === "review" && (
          <>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
              Application Received
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 24 }}>
              Reviewing Your Profile
            </h1>

            <div style={{ background: "#1A191A", border: "1px solid #2A292A", padding: "24px", marginBottom: 24 }}>
              {[
                ["Name", name],
                ["Role", role],
                company && ["Company", company],
                ["Investment Budget", budget],
                ["Portfolio", portfolio],
                ["Liquidity", liquidity],
                ["Objective", objective],
              ].filter(Boolean).map((row) => {
                const [k, v] = row as [string, string];
                return (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "9px 0", borderBottom: "1px solid #2A292A" }}>
                    <span style={{ ...mono, fontSize: 10, color: "#6b6b6b", letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</span>
                    <span style={{ ...mono, fontSize: 11, color: "#fff", maxWidth: "55%", textAlign: "right" }}>{v}</span>
                  </div>
                );
              })}
            </div>

            <button onClick={handleReviewConfirm} style={primaryBtn}>
              Confirm & Get Access →
            </button>
            <button onClick={() => setStage("form")} style={{ ...primaryBtn, background: "transparent", borderColor: "#2A292A", color: "#6b6b6b", marginTop: 10 }}>
              ← Edit Application
            </button>
          </>
        )}

        {/* ── STAGE: DECLINED ── */}
        {stage === "declined" && (
          <>
            <div style={{ padding: "28px 24px", border: "1px solid rgba(200,169,110,0.25)", background: "rgba(200,169,110,0.06)", marginBottom: 28 }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#C8A96E", textTransform: "uppercase", marginBottom: 10 }}>
                Application Status
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.04em", color: "#C8A96E", marginBottom: 12 }}>
                Not Eligible at This Time
              </h2>
              <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
                NURV shares are structured for qualified investors with an established investment
                background and available capital. Based on your profile, this product may not be
                the right fit at this stage.
              </p>
              <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginTop: 12 }}>
                Our team will be in touch at <strong style={{ color: "#fff" }}>{email}</strong> if
                circumstances change or other opportunities arise.
              </p>
            </div>
            <a href="/" style={{ ...primaryBtn, display: "block", textDecoration: "none", textAlign: "center" }}>
              Return to Jalour.com
            </a>
          </>
        )}

        {/* ── STAGE: ACCESS CODE ── */}
        {stage === "verify" && (
          <>
            <div style={{ padding: "20px 24px", border: "1px solid #1a4a7a", background: "rgba(46,124,204,0.08)", marginBottom: 32 }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
                Qualified — Access Granted
              </div>
              <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
                Your profile meets our investor criteria. Use the access code below to enter the
                dashboard. A member of our team will follow up at{" "}
                <strong style={{ color: "#fff" }}>{email}</strong>.
              </p>
            </div>

            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#6b6b6b", textTransform: "uppercase", marginBottom: 8 }}>
              Your Access Code
            </div>
            <div style={{ padding: "18px 20px", border: "1px solid #2A292A", background: "#1A191A", ...mono, fontSize: 26, fontWeight: 700, letterSpacing: "0.35em", color: "#C8A96E", marginBottom: 28, textAlign: "center" }}>
              {DASHBOARD_PASSWORD}
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <Field label="Enter Access Code to Open Dashboard">
                <input
                  type="text"
                  value={passwordInput}
                  onChange={e => { setPasswordInput(e.target.value.toUpperCase()); setPasswordError(false); }}
                  placeholder="Access code"
                  style={{ ...inputStyle, letterSpacing: "0.2em", textTransform: "uppercase", ...(passwordError ? { borderColor: "#e05555" } : {}) }}
                />
              </Field>
              {passwordError && (
                <p style={{ ...mono, fontSize: 11, color: "#e05555", marginBottom: 16 }}>Incorrect code. Please try again.</p>
              )}
              <button type="submit" style={primaryBtn}>Open Dashboard →</button>
            </form>
          </>
        )}

        <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid #1c1b1c", ...mono, fontSize: 9, color: "#2a2a2a", letterSpacing: "0.08em", lineHeight: 1.9 }}>
          NURV MALL — AL SHOROUK · Powered by JALOUR®<br />
          This platform is for qualified investors only. Not financial advice.
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "#6b6b6b", textTransform: "uppercase", marginBottom: 7 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 22px" }}>
      <div style={{ height: 1, background: "#1c1b1c", flex: 1 }} />
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#3a3a3a", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ height: 1, background: "#1c1b1c", flex: 1 }} />
    </div>
  );
}

function SelectField({ value, onChange, placeholder, children }: { value: string; onChange: (v: string) => void; placeholder: string; children: React.ReactNode }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0B0A0B",
  border: "1px solid #2A292A",
  color: "#fff",
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
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
