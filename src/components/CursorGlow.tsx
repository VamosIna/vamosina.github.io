"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glow = { ...target };
    const ring = { ...target };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let shown = false;

    const setShown = (on: boolean) => {
      if (on === shown) return;
      shown = on;
      [glowRef, ringRef, dotRef].forEach((r) => {
        if (r.current) r.current.style.opacity = on ? "1" : "0";
      });
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setShown(true);
      const interactive = (e.target as HTMLElement | null)?.closest?.(
        "a, button, input, textarea, [role='button']",
      );
      targetScale = interactive ? 1.7 : 1;
    };

    const onLeave = () => setShown(false);

    const tick = () => {
      glow.x += (target.x - glow.x) * 0.07;
      glow.y += (target.y - glow.y) * 0.07;
      ring.x += (target.x - ring.x) * 0.2;
      ring.y += (target.y - ring.y) * 0.2;
      scale += (targetScale - scale) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden overflow-hidden [@media(pointer:fine)]:block">
      <div
        ref={glowRef}
        style={{ opacity: 0 }}
        className="absolute -top-56 -left-56 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(53,226,196,0.16),rgba(139,123,255,0.08)_45%,transparent_65%)] blur-2xl transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="absolute -top-4 -left-4 h-8 w-8 rounded-full border border-teal/40 transition-opacity duration-300"
      />
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-teal shadow-[0_0_14px_4px_rgba(53,226,196,0.55)] transition-opacity duration-300"
      />
    </div>
  );
}
