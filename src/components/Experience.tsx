import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import { SectionHeading } from "./About";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Work Experience" title="Career journey" />
        </Reveal>

        <div className="mt-14 space-y-4">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.period}`} delay={Math.min(i * 40, 160)}>
              <div className="grid grid-cols-1 gap-4 rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-white/15 sm:grid-cols-[200px_1fr] sm:gap-8 sm:p-7">
                <div>
                  <p className="font-mono text-xs text-teal">{job.period}</p>
                  <p className="mt-2 font-display text-lg leading-tight font-semibold">
                    {job.company}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-white">{job.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{job.summary}</p>

                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-mist/90">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal/60" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-mist"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
