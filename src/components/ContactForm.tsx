"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ projectName }: { projectName?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          project: data.get("project"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-3 border border-white/20 px-6 py-8">
        <p className="text-sm text-jalour-white">
          Thanks — your message has been sent. We usually respond within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="self-start text-xs tracking-jalour uppercase text-jalour-blue hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {projectName && (
        <input type="hidden" name="project" value={projectName} />
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xs tracking-jalour uppercase text-jalour-grey">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border border-white/20 bg-transparent px-4 py-3 text-sm text-jalour-white outline-none focus:border-jalour-blue"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs tracking-jalour uppercase text-jalour-grey">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-white/20 bg-transparent px-4 py-3 text-sm text-jalour-white outline-none focus:border-jalour-blue"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs tracking-jalour uppercase text-jalour-grey">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={
            projectName ? `I'm interested in ${projectName}. ` : undefined
          }
          className="border border-white/20 bg-transparent px-4 py-3 text-sm text-jalour-white outline-none focus:border-jalour-blue"
        />
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 self-start border border-jalour-blue bg-jalour-blue px-7 py-3 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-transparent hover:text-jalour-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
