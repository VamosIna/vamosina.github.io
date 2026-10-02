import { clients } from "@/data/portfolio";

export default function Marquee() {
  const row = [...clients, ...clients];

  return (
    <section aria-label="Companies and clients" className="border-y border-line bg-ink-2/60 py-6">
      <p className="mb-4 text-center font-mono text-xs tracking-[0.18em] text-mist/80">
        EXPERIENCE ACROSS
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-lg font-semibold whitespace-nowrap text-mist/80 transition-colors hover:text-white">
                {name}
              </span>
              <span className="h-1 w-1 rounded-full bg-teal/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
