"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-teal to-violet font-display text-sm font-bold text-ink">
            YR
          </span>
          <span className="hidden font-mono text-xs tracking-widest text-mist sm:block">
            YOPPIE<span className="text-teal">.</span>DEV
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            className="hidden rounded-full border border-line bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-teal/50 hover:bg-teal/10 sm:block"
          >
            CV
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] md:block"
          >
            Contact Me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/5 md:hidden"
          >
            <span className="flex flex-col gap-1">
              <span className={`h-0.5 w-4 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-0.5 w-4 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 px-3 pb-2">
              <a href={profile.cv} className="flex-1 rounded-full border border-line bg-white/5 py-2 text-center text-sm text-white">
                CV
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-white py-2 text-center text-sm font-semibold text-ink">
                Contact
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
