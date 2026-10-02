import { profile, stats } from "@/data/portfolio";
import Orb from "./Orb";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-3.5 py-1.5 text-xs font-medium text-teal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Available for senior Flutter roles & freelance
          </div>

          <p className="mt-7 font-mono text-sm tracking-widest text-mist">
            {profile.location.toUpperCase()}
          </p>

          <h1 className="mt-3 font-display text-5xl leading-[0.98] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {profile.firstName}
            <br />
            <span className="animate-gradient bg-gradient-to-r from-teal via-cyan to-violet bg-clip-text text-transparent">
              {profile.lastName}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-mist">
            <span className="font-medium text-white">{profile.role}</span>
            <span className="mx-2 text-line">·</span>
            {profile.tagline}
          </p>

          <p className="mt-5 max-w-xl leading-relaxed text-mist/90">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="shine glow-teal rounded-full bg-gradient-to-r from-teal to-cyan px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Let&apos;s Work Together →
            </a>
            <a
              href="#projects"
              className="rounded-full border border-line bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10"
            >
              View Projects
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-3 text-sm font-medium text-mist transition-colors hover:text-teal"
            >
              LinkedIn ↗
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-mist">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem]">
          <div className="animate-float absolute top-24 -left-8 z-20 hidden rounded-2xl border border-line bg-surface/90 px-4 py-3 backdrop-blur-md sm:block">
            <p className="font-mono text-xs tracking-widest text-teal">REAL-TIME</p>
            <p className="mt-0.5 text-sm font-semibold">MQTT · WebRTC</p>
          </div>
          <div className="animate-float absolute top-60 -right-4 z-20 hidden rounded-2xl border border-line bg-surface/90 px-4 py-3 backdrop-blur-md [animation-delay:-4s] sm:block">
            <p className="font-mono text-xs tracking-widest text-violet">COVERAGE</p>
            <p className="mt-0.5 text-sm font-semibold">97% State Tests</p>
          </div>

          <p className="mb-5 text-center font-mono text-xs tracking-[0.18em] text-teal">
            TAP TO TALK TO MY AI
          </p>

          <a
            href="#chat"
            aria-label="Open my AI assistant"
            className="group relative mx-auto block h-[14rem] w-[14rem] sm:h-[22rem] sm:w-[22rem]"
          >
            <Orb className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="translate-y-24 rounded-full border border-line bg-ink/70 px-4 py-2 font-mono text-xs tracking-widest text-mist opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-20 group-hover:text-white group-hover:opacity-100">
                ASK ME ANYTHING →
              </span>
            </span>
          </a>

          <div className="relative z-10 -mt-6 overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-surface/95 to-ink-2/95 p-6 shadow-2xl backdrop-blur-md">
            <div className="grain absolute inset-0 opacity-40" />
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal via-cyan to-violet font-display text-lg font-bold text-ink">
                  YR
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold">{profile.name}</p>
                  <p className="truncate text-sm text-mist">{profile.role}</p>
                </div>
              </div>

              <p className="mt-5 font-mono text-xs leading-relaxed text-mist">
                <span className="text-violet">const</span>{" "}
                <span className="text-teal">impact</span> = {"{ "}
                mau: <span className="text-cyan">&quot;+239%&quot;</span>, crashes_fixed:{" "}
                <span className="text-cyan">&quot;4,500+ users&quot;</span>
                {" }"}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Clean Architecture", "DDD", "BLoC", "PostHog", "Sentry"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-mist"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="mt-5 font-mono text-xs text-teal">
                ship(impact)<span className="animate-blink">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
