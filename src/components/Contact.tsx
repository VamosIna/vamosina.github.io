"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import { SectionHeading } from "./About";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone / WhatsApp", value: profile.phone, href: `https://wa.me/${profile.phoneWa}` },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative border-t border-line bg-ink-2/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 overflow-hidden">
        <div className="absolute left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Let's build something great" />
          <p className="mt-4 max-w-xl text-mist">
            Open to senior Flutter / mobile engineering opportunities and freelance work. Let&apos;s
            talk.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {channels.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 60}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-teal/30 hover:bg-surface"
                >
                  <p className="font-mono text-xs tracking-widest text-teal">
                    {channel.label.toUpperCase()}
                  </p>
                  <p className="mt-1.5 text-sm text-white">{channel.value}</p>
                </a>
              </Reveal>
            ))}
            <Reveal delay={200}>
              <a
                href={profile.cv}
                className="block rounded-2xl border border-line bg-gradient-to-br from-teal/10 to-violet/10 p-5 transition-colors hover:border-teal/40"
              >
                <p className="font-mono text-xs tracking-widest text-violet">RESUME</p>
                <p className="mt-1.5 text-sm text-white">Download CV (PDF) →</p>
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-line bg-surface/50 p-6 sm:p-7"
            >
              {sent ? (
                <div className="grid h-full min-h-[280px] place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal/15 text-xl text-teal">
                      ✓
                    </div>
                    <p className="mt-4 font-display text-lg font-semibold">
                      Your mail client is opening…
                    </p>
                    <p className="mt-2 text-sm text-mist">
                      If nothing happens, email {profile.email} directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-5 rounded-full border border-line px-5 py-2.5 text-sm text-mist transition-colors hover:text-white"
                    >
                      Send another
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Your Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      placeholder="Jane Doe"
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="font-mono text-xs tracking-widest text-mist">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about the role or project…"
                      className="mt-2 w-full resize-none rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist/80 focus:border-teal/40 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-5 w-full rounded-xl bg-gradient-to-r from-teal to-cyan py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.01] sm:w-auto sm:px-8"
                  >
                    Send Message →
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-mono text-xs tracking-widest text-mist">{label.toUpperCase()}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist/80 focus:border-teal/40 focus:outline-none"
      />
    </div>
  );
}
