"use client";

import { useState } from "react";
import Link from "next/link";
import { Space_Grotesk, Space_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

type Stage = "form" | "review" | "submitted" | "login" | "dashboard";

const mono: React.CSSProperties = { fontFamily: spaceMono.style.fontFamily };

export default function InvestorPage() {
  const [stage, setStage] = useState<Stage>("form");
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

  // Returning-applicant login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name.trim() || !phone.trim() || !emailOk || !occupation.trim() || !education.trim() || !budget || !liquidity || !objective) {
      setFormError("Please complete all required fields before continuing.");
      return;
    }
    setFormError("");
    setStage("review");
  }

  async function handleConfirmSubmit() {
    setSubmitting(true);
    setFormError("");
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
      setStage("submitted");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/investor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginCode }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Incorrect email or access code.");
      }
      setStage("dashboard");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Incorrect email or access code.");
    } finally {
      setLoggingIn(false);
    }
  }

  if (stage === "dashboard") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#0B0A0B" }}>
        <iframe
          src="/investor/dashboard"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          title="NURV Investor Dashboard"
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B0A0B", color: "#fff", fontFamily: spaceGrotesk.style.fontFamily, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ width: "100%", maxWidth: 580 }}>
        {/* Logo */}
        <div style={{ marginBottom: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase" }}>NURV</div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#2E7CCC", textTransform: "uppercase", marginTop: 4 }}>
              by JALOUR® — Private Investor Access
            </div>
          </div>
          {(stage === "form" || stage === "submitted") && (
            <button
              onClick={() => setStage("login")}
              style={{ ...mono, background: "transparent", border: "none", color: "#6b6b6b", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", textDecoration: "underline" }}
            >
              Have an access code?
            </button>
          )}
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

            <form onSubmit={handleReviewSubmit}>
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

              <button type="submit" style={primaryBtn}>Review Application →</button>
            </form>

            <p style={{ ...mono, fontSize: 9, color: "#3a3a3a", letterSpacing: "0.06em", lineHeight: 1.8, marginTop: 28 }}>
              * Required fields. Our team reviews every application — if selected, you&apos;ll receive a
              unique access code by email.
            </p>
          </>
        )}

        {/* ── REVIEW ── */}
        {stage === "review" && (
          <>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
              Confirm Details
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 24 }}>
              Review Your Application
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

            {formError && (
              <p style={{ ...mono, fontSize: 11, color: "#e05555", marginBottom: 16 }}>{formError}</p>
            )}

            <button onClick={handleConfirmSubmit} disabled={submitting} style={{ ...primaryBtn, ...(submitting ? { opacity: 0.6, cursor: "not-allowed" } : {}) }}>
              {submitting ? "Submitting…" : "Confirm & Submit →"}
            </button>
            <button onClick={() => setStage("form")} disabled={submitting} style={{ ...primaryBtn, background: "transparent", borderColor: "#2A292A", color: "#6b6b6b", marginTop: 10 }}>
              ← Edit Application
            </button>
          </>
        )}

        {/* ── SUBMITTED ── */}
        {stage === "submitted" && (
          <>
            <div style={{ padding: "28px 24px", border: "1px solid #1a4a7a", background: "rgba(46,124,204,0.08)", marginBottom: 28 }}>
              <div style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 10 }}>
                Application Received
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 12 }}>
                Under Review
              </h2>
              <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
                Thank you — your application is being reviewed by our team. If selected, you&apos;ll
                receive a unique access code at <strong style={{ color: "#fff" }}>{email}</strong> to
                open the investor dashboard.
              </p>
            </div>
            <Link href="/" style={{ ...primaryBtn, display: "block", textDecoration: "none", textAlign: "center" }}>
              Return to Jalour.com
            </Link>
          </>
        )}

        {/* ── LOGIN (returning applicant) ── */}
        {stage === "login" && (
          <>
            <div style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "#2E7CCC", textTransform: "uppercase", marginBottom: 8 }}>
              Approved Investors
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: 24 }}>
              Enter Your Access Code
            </h1>

            <form onSubmit={handleLoginSubmit}>
              <Field label="Email Address">
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
              </Field>
              <Field label="Access Code">
                <input
                  type="text"
                  value={loginCode}
                  onChange={e => { setLoginCode(e.target.value.toUpperCase()); setLoginError(""); }}
                  placeholder="XXXXX-XXXXX"
                  style={{ ...inputStyle, letterSpacing: "0.2em", textTransform: "uppercase", ...(loginError ? { borderColor: "#e05555" } : {}) }}
                />
              </Field>
              {loginError && (
                <p style={{ ...mono, fontSize: 11, color: "#e05555", marginBottom: 16 }}>{loginError}</p>
              )}
              <button type="submit" disabled={loggingIn} style={{ ...primaryBtn, ...(loggingIn ? { opacity: 0.6, cursor: "not-allowed" } : {}) }}>
                {loggingIn ? "Verifying…" : "Open Dashboard →"}
              </button>
              <button type="button" onClick={() => setStage("form")} style={{ ...primaryBtn, background: "transparent", borderColor: "#2A292A", color: "#6b6b6b", marginTop: 10 }}>
                ← Back to Application
              </button>
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
      <label style={{ display: "block", fontFamily: spaceMono.style.fontFamily, fontSize: 9, letterSpacing: "0.18em", color: "#6b6b6b", textTransform: "uppercase", marginBottom: 7 }}>
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
      <span style={{ fontFamily: spaceMono.style.fontFamily, fontSize: 9, letterSpacing: "0.2em", color: "#3a3a3a", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>
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
  fontFamily: spaceMono.style.fontFamily,
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
  fontFamily: spaceMono.style.fontFamily,
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  padding: "14px 20px",
  cursor: "pointer",
  marginTop: 8,
};
