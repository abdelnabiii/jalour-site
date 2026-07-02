"use client";

import { useState } from "react";

const DASHBOARD_PASSWORD = "NURV2026";

type Stage = "form" | "review" | "verify" | "dashboard" | "declined";

const mono: React.CSSProperties = { fontFamily: "'Space Mono', monospace" };

const DISQUALIFY = {
  budget: ["Below EGP 500,000"],
  liquidity: ["No available liquid capital"],
};

export default function InvestorPage() {
  const [stage, setStage] = useState<Stage>("form");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Personal
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [socialLinks, setSocialLinks] = useState("");

  // Investment
  const [budget, setBudget] = useState("");
  const [liquidity, setLiquidity] = useState("");
  const [otherProjects, setOtherProjects] = useState("");
  const [objective, setObjective] = useState("");

  // Lifestyle
  const [clubMemberships, setClubMemberships] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spouseOccupation, setSpouseOccupation] = useState("");

  function isDisqualified() {
    return (
      DISQUALIFY.budget.includes(budget) ||
      DISQUALIFY.liquidity.includes(liquidity)
    );
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name.trim() || !phone.trim() || !emailOk || !occupation.trim() || !education.trim() || !budget || !liquidity || !objective) {
      setFormError("Please complete all required fields before continuing.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, address, occupation, education, socialLinks,
          budget, liquidity, otherProjects, objective,
          clubMemberships, spouseName, spouseOccupation,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setStage("review");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
    <div style={{ minHeight: "100vh", background: "#0B0A0B", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: 580 }}>
        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase" }}>NURV</div>
          <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#2E7CCC", textTransform: "uppercase", marginTop: 4 }}>
            by JALOUR® — Private Investor Access
          </div>
        </div>

        {/* ── FORM ── */}
        {stage === "form" && (
          <>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
              Investor Application
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 10 }}>
              Apply for Access
            </h1>
            <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: 36, maxWidth: 500 }}>
              NURV investor access is by application only. Complete the form below — it takes under
              three minutes. All information is kept strictly confidential.
            </p>

            <form onSubmit={handleFormSubmit}>
              <Divider label="Personal Information" />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <Field label="Full Name *">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={inputStyle} />
                </Field>
                <Field label="Mobile Number *">
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+20 1XX XXX XXXX" style={inputStyle} />
                </Field>
              </div>

              <Field label="Email Address *">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
              </Field>

              <Field label="Address">
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="City / Area" style={inputStyle} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <Field label="Occupation / Job Title *">
                  <input type="text" value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="e.g. CEO, Doctor, Engineer" style={inputStyle} />
                </Field>
                <Field label="Educational Background *">
                  <input type="text" value={education} onChange={e => setEducation(e.target.value)} placeholder="University / Field of study" style={inputStyle} />
                </Field>
              </div>

              <Field label="Social Media Links (Instagram / LinkedIn / Facebook)">
                <input type="text" value={socialLinks} onChange={e => setSocialLinks(e.target.value)} placeholder="@handle or profile URLs" style={inputStyle} />
              </Field>

              <Divider label="Investment Profile" />

              <Field label="Investment Budget for This Project *">
                <SelectField value={budget} onChange={setBudget} placeholder="— Select your range —">
                  <option>Below EGP 500,000</option>
                  <option>EGP 500,000 – 1,000,000</option>
                  <option>EGP 1,000,000 – 3,000,000</option>
                  <option>EGP 3,000,000 – 6,000,000</option>
                  <option>EGP 6,000,000+</option>
                </SelectField>
              </Field>

              <Field label="Available Liquid Capital *">
                <SelectField value={liquidity} onChange={setLiquidity} placeholder="— Select —">
                  <option>No available liquid capital</option>
                  <option>Yes — available within 30 days</option>
                  <option>Yes — available immediately</option>
                </SelectField>
              </Field>

              <Field label="Primary Investment Objective *">
                <SelectField value={objective} onChange={setObjective} placeholder="— Select your goal —">
                  <option>Monthly passive income (rental yield)</option>
                  <option>Long-term capital appreciation</option>
                  <option>Portfolio diversification</option>
                  <option>Inflation hedge / wealth preservation</option>
                  <option>Income and growth equally</option>
                </SelectField>
              </Field>

              <Field label="Other Real Estate Investments Owned">
                <input type="text" value={otherProjects} onChange={e => setOtherProjects(e.target.value)} placeholder="e.g. Marassi, Zed East, Palm Hills, etc." style={inputStyle} />
              </Field>

              <Divider label="Lifestyle & Background" />

              <Field label="Club Memberships">
                <input type="text" value={clubMemberships} onChange={e => setClubMemberships(e.target.value)} placeholder="e.g. Gezira, Wadi Degla, Maadi Club" style={inputStyle} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <Field label="Spouse / Partner Name">
                  <input type="text" value={spouseName} onChange={e => setSpouseName(e.target.value)} placeholder="Full name" style={inputStyle} />
                </Field>
                <Field label="Spouse / Partner Occupation">
                  <input type="text" value={spouseOccupation} onChange={e => setSpouseOccupation(e.target.value)} placeholder="Occupation / title" style={inputStyle} />
                </Field>
              </div>

              {formError && (
                <p style={{ ...mono, fontSize: 11, color: "#e05555", marginBottom: 16 }}>{formError}</p>
              )}

              <button type="submit" disabled={submitting} style={{ ...primaryBtn, ...(submitting ? { opacity: 0.6, cursor: "not-allowed" } : {}) }}>
                {submitting ? "Submitting…" : "Submit Application →"}
              </button>
            </form>

            <p style={{ ...mono, fontSize: 9, color: "#3a3a3a", letterSpacing: "0.06em", lineHeight: 1.8, marginTop: 28 }}>
              * Required fields. Applications are reviewed immediately. Qualifying investors receive
              dashboard access within this session.
            </p>
          </>
        )}

        {/* ── REVIEW ── */}
        {stage === "review" && (
          <>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
              Application Received
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 24 }}>
              Reviewing Your Profile
            </h1>

            <div style={{ background: "#1A191A", border: "1px solid #2A292A", padding: "24px", marginBottom: 24 }}>
              {([
                ["Name", name],
                ["Phone", phone],
                ["Email", email],
                address && ["Address", address],
                ["Occupation", occupation],
                ["Education", education],
                socialLinks && ["Social Media", socialLinks],
                ["Budget", budget],
                ["Liquidity", liquidity],
                ["Objective", objective],
                otherProjects && ["Other Investments", otherProjects],
                clubMemberships && ["Club Memberships", clubMemberships],
                spouseName && ["Spouse", spouseName],
              ] as (string[] | false)[]).filter(Boolean).map((row) => {
                const [k, v] = row as string[];
                return (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "9px 0", borderBottom: "1px solid #2A292A" }}>
                    <span style={{ ...mono, fontSize: 10, color: "#6b6b6b", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginRight: 16 }}>{k}</span>
                    <span style={{ ...mono, fontSize: 11, color: "#fff", maxWidth: "60%", textAlign: "right" }}>{v}</span>
                  </div>
                );
              })}
            </div>

            <button onClick={handleReviewConfirm} style={primaryBtn}>Confirm & Get Access →</button>
            <button onClick={() => setStage("form")} style={{ ...primaryBtn, background: "transparent", borderColor: "#2A292A", color: "#6b6b6b", marginTop: 10 }}>
              ← Edit Application
            </button>
          </>
        )}

        {/* ── DECLINED ── */}
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
                NURV shares are structured for investors with available capital ready to deploy.
                Based on your profile, this opportunity may not be the right fit at this stage.
              </p>
              <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginTop: 12 }}>
                Our team will follow up at <strong style={{ color: "#fff" }}>{email}</strong> if
                a suitable opportunity arises. You can also reach us on{" "}
                <strong style={{ color: "#fff" }}>17836</strong>.
              </p>
            </div>
            <a href="/" style={{ ...primaryBtn, display: "block", textDecoration: "none", textAlign: "center" }}>
              Return to Jalour.com
            </a>
          </>
        )}

        {/* ── VERIFY ── */}
        {stage === "verify" && (
          <>
            <div style={{ padding: "20px 24px", border: "1px solid #1a4a7a", background: "rgba(46,124,204,0.08)", marginBottom: 32 }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
                Qualified — Access Granted
              </div>
              <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
                Your profile meets our investor criteria. Use the access code below to open the
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
          NURV MALL — AL SHOROUK · Powered by JALOUR® · Hotline: 17836<br />
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
