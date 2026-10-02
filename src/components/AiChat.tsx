"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { SectionHeading } from "./About";

type Message = { role: "user" | "assistant"; text: string };

const presets = [
  "Why should I hire Yoppie?",
  "What's his hardest project?",
  "Which technologies does he use?",
  "How do I contact him?",
];

const knowledge: { keys: string[]; answer: string }[] = [
  {
    keys: ["hire", "why", "value", "good"],
    answer:
      "Yoppie is a technical owner — not just a contributor. At AYANA Hospitality he owns two production Flutter platforms processing 6.1M+ analytics events/month, grew a field-staff app's MAU by 239% in 6 months, and fixed crashes affecting 4,500+ users. He pairs deep architecture (Clean Architecture, DDD, BLoC) with measurable business outcomes.",
  },
  {
    keys: ["hard", "hardest", "difficult", "proud", "favourite", "favorite", "best"],
    answer:
      "The AYANA guest platform: 26 feature modules, 18 domain packages, 22 shared SDK modules, 4 languages (EN/ID/JP/KR), running across Bali, Komodo, and Jakarta. He also diagnosed a nasty 401 token-refresh loop plus Hive cache corruption that hit 4,500+ users — solved with a centralized auth interceptor in the shared networking SDK.",
  },
  {
    keys: ["tech", "stack", "skill", "technolog", "flutter", "language", "use", "tools"],
    answer:
      "Flutter, Dart, Android (Kotlin), iOS, and Flutter Web. Architecture: Clean Architecture, DDD, SOLID. State: BLoC, Cubit, Riverpod, Provider. Real-time: MQTT, WebRTC, socket.io, WebSocket, GPS streaming. Observability: PostHog, Sentry, Crashlytics, feature flags. Testing: unit / widget / integration at 97% state-management coverage.",
  },
  {
    keys: ["contact", "email", "reach", "whatsapp", "call", "linkedin", "phone"],
    answer:
      "Email raditya.pc1@gmail.com, message him on LinkedIn at linkedin.com/in/yoppie-raditya-wicaksono, or call / WhatsApp +62 851-5892-1108. He'll reply with scope, timeline, and rate.",
  },
  {
    keys: ["experience", "years", "senior", "level", "how long"],
    answer:
      "8+ years in software engineering and 6+ years of professional Flutter development. He has shipped 10+ production apps across hospitality, fintech, edtech, and healthcare — at AYANA Hospitality, Ajari Technologies, MSIG Indonesia, Kompas Gramedia, Indocyber, and more.",
  },
  {
    keys: ["freelance", "available", "availability", "remote", "contract", "job", "hiring"],
    answer:
      "Yes — he's open to senior Flutter roles and freelance / contract work, remote worldwide or on-site around Jakarta and Bali. He works in both English and Bahasa Indonesia.",
  },
  {
    keys: ["real-time", "realtime", "mqtt", "webrtc", "socket", "gps", "streaming"],
    answer:
      "Real-time is a core strength: MQTT + GPS streaming for guest transportation tracking at AYANA, WebRTC and socket.io for LearnXpert's 800+ concurrent learning sessions, and event-driven architectures throughout.",
  },
  {
    keys: ["test", "coverage", "quality", "crash"],
    answer:
      "97% unit test coverage on state management in MyCTE (819 tests / 108 files) and 1,483 tests across 444 files in the guest app. He also ships with Sentry, Crashlytics, and PostHog instrumentation by default.",
  },
];

function answerFor(input: string): string {
  const q = input.toLowerCase();
  const hit = knowledge.find((entry) => entry.keys.some((key) => q.includes(key)));
  return (
    hit?.answer ??
    "Good question! Yoppie is a Senior Flutter Mobile Developer with 8+ years in engineering and 6+ years in Flutter — technical owner of two AYANA Hospitality platforms. Ask me about his experience, stack, hardest project, or how to hire him."
  );
}

const greeting: Message = {
  role: "assistant",
  text: "Hi! I'm Yoppie's assistant. Ask me anything about his engineering career — experience, stack, projects, or availability.",
};

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    greeting,
    { role: "user", text: "Why should I hire Yoppie?" },
    {
      role: "assistant",
      text: knowledge[0].answer,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: answerFor(value) }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <section id="chat" className="relative border-t border-line bg-ink-2/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Interactive AI" title="Ask about Yoppie" />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-2xl border border-line bg-ink/70">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-teal to-violet text-xs font-bold text-ink">
                    AI
                  </span>
                  <span className="font-mono text-xs text-mist">yoppie-assistant</span>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-xs text-teal">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  DEMO
                </span>
              </div>

              <div ref={scrollRef} className="h-[380px] space-y-4 overflow-y-auto p-5">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-gradient-to-br from-teal to-cyan text-ink"
                          : "rounded-bl-sm border border-line bg-surface text-mist"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-4">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal" />
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-line p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about his experience, stack, or projects…"
                  className="min-w-0 flex-1 rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist/80 focus:border-teal/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={typing}
                  className="rounded-xl bg-gradient-to-r from-teal to-cyan px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-line bg-surface/50 p-5">
              <p className="font-mono text-xs tracking-widest text-violet">QUICK QUESTIONS</p>
              <div className="mt-4 space-y-2.5">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => send(preset)}
                    className="w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-left text-sm text-mist transition-colors hover:border-teal/30 hover:bg-teal/5 hover:text-white"
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-mist/80">
                Demo assistant with canned answers from Yoppie&apos;s CV. No API calls, no data leaves
                your browser.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
