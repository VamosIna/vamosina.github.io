"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import Reveal from "./Reveal";
import { SectionHeading } from "./About";

const INITIAL_COUNT = 6;

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [shot, setShot] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  const openProject = (project: Project) => {
    setActive(project);
    setShot(0);
  };

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setShot((s) => (s + 1) % active.gallery.length);
      if (e.key === "ArrowLeft") setShot((s) => (s - 1 + active.gallery.length) % active.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <section id="projects" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Featured Projects" title="What I've built" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 70}>
              <button
                type="button"
                onClick={() => openProject(project)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                }}
                className="spotlight group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-surface"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-ink-2 to-surface">
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center">
                      <div className="text-center">
                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-teal/20 to-violet/20 font-display text-lg font-bold text-teal">
                          {project.title.split(" ")[0]}
                        </div>
                        <p className="mt-3 px-4 font-mono text-xs tracking-widest text-mist">
                          {project.category.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-md bg-black/50 px-2 py-1 font-mono text-xs text-teal backdrop-blur-sm">
                    {project.index}
                  </span>
                  {project.gallery.length > 1 && (
                    <span className="absolute top-3 right-3 rounded-md bg-black/50 px-2 py-1 font-mono text-xs text-mist backdrop-blur-sm">
                      {project.gallery.length} shots
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs tracking-widest text-cyan">
                    {project.category.toUpperCase()}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-teal">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-mist">
                    {project.client} · {project.year}
                  </p>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-mist/90">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2 py-0.5 font-mono text-xs text-mist"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="rounded-full border border-line bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10"
            >
              {showAll ? "Show fewer projects" : `Show all ${projects.length} projects`}
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-ink-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-5">
              <div>
                <p className="font-mono text-xs tracking-widest text-teal">
                  {active.index} · {active.category.toUpperCase()}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">{active.title}</h3>
                <p className="mt-1 text-xs text-mist">
                  {active.client} · {active.year}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/5 text-mist transition-colors hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {active.gallery.length > 0 ? (
                <>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-black/40">
                    <Image
                      src={active.gallery[shot]}
                      alt={`${active.title} screenshot ${shot + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-contain"
                    />
                  </div>
                  {active.gallery.length > 1 && (
                    <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
                      {active.gallery.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setShot(i)}
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                            i === shot ? "border-teal" : "border-line opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={src} alt="" fill sizes="96px" className="object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="grid place-items-center rounded-xl border border-dashed border-line bg-surface/40 py-20 text-center">
                  <p className="font-display text-2xl font-bold text-teal">{active.title}</p>
                  <p className="mt-2 max-w-sm text-sm text-mist">
                    Screenshots available on request.
                  </p>
                </div>
              )}

              <p className="mt-5 text-sm leading-relaxed text-mist">{active.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-mist"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
