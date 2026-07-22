import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { Dict, Lang } from "@/lib/i18n/shroomed";
import { getSubscriberCount, saveUser } from "@/lib/waitlist";

type Props = { dict: Dict; lang: Lang };

export function ShroomedLanding({ dict, lang }: Props) {
  const [count, setCount] = useState(842);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setCount(getSubscriberCount());
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3500);
  }

  function handleHeroSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const goal = (form.elements.namedItem("goal") as HTMLSelectElement).value;
    if (!email) return;
    saveUser(email, goal || "No especificado");
    setCount(getSubscriberCount());
    showToast(dict.toast.hero);
    form.reset();
  }

  function handleFinalSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!email) return;
    saveUser(email, "Registro directo CTA final");
    setCount(getSubscriberCount());
    showToast(dict.toast.final);
    form.reset();
  }

  const otherLang: Lang = lang === "es" ? "en" : "es";
  const otherLabel = lang === "es" ? dict.langSwitch.toEn : dict.langSwitch.toEs;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-shroom-cream text-shroom-navy">
      <FloatingStickers />

      {/* Header Fijo */}
      <header className="sticky top-0 z-50 border-b-[3px] border-shroom-navy bg-shroom-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <a href="#hero" className="flex items-center gap-2 font-display text-2xl tracking-wide">
            <span className="text-3xl">🍄</span>
            <span>SHROOMED</span>
          </a>
          <nav className="hidden items-center gap-8 font-heading text-sm font-bold md:flex">
            <a href="#pilares" className="transition-colors hover:text-shroom-coral">
              {dict.nav.assistant}
            </a>
            <a href="#boveda" className="transition-colors hover:text-shroom-coral">
              {dict.nav.vault}
            </a>
            <a href="#ciencia" className="transition-colors hover:text-shroom-coral">
              {dict.nav.science}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to={otherLang === "en" ? "/en" : "/"}
              className="btn-retro-lang cursor-pointer px-4 py-1.5 font-heading text-xs font-bold uppercase"
            >
              {otherLabel}
            </Link>
            <a
              href="#waitlist"
              className="btn-retro-yellow hidden cursor-pointer px-5 py-2 font-heading text-xs font-bold uppercase sm:inline-block"
            >
              {dict.nav.join}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative z-10 pt-12 pb-28">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-[3px] border-shroom-navy bg-shroom-sky px-5 py-2 font-heading text-xs font-bold uppercase tracking-wider text-shroom-navy retro-shadow-sm">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-shroom-navy bg-shroom-coral" />
            <span>{dict.hero.badge}</span>
          </div>

          <h1 className="mx-auto max-w-5xl font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">{dict.hero.titleTop}</span>
            <span className="mt-2 block text-shroom-coral">
              {dict.hero.titleBottom}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed opacity-85 sm:text-lg">
            <strong>{dict.hero.subtitleLead}</strong>
            {dict.hero.subtitle}
          </p>

          {/* Waitlist card */}
          <div
            id="waitlist"
            className="mx-auto mt-10 max-w-4xl rounded-3xl border-[3px] border-shroom-navy bg-white p-6 text-center retro-shadow-lg sm:p-8"
          >
            <div className="mb-6 flex items-center justify-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-[#196768] sm:text-sm">
              <span className="text-base">✨</span>
              <span>{dict.hero.waitlistHeader}</span>
            </div>

            <form onSubmit={handleHeroSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                type="email"
                name="email"
                required
                placeholder={dict.hero.emailPlaceholder}
                className="flex-1 rounded-full border-[3px] border-shroom-navy bg-shroom-cream px-5 py-3.5 font-body text-sm outline-none transition-all focus:retro-shadow-sm"
              />
              <select
                name="goal"
                required
                defaultValue=""
                className="flex-1 rounded-full border-[3px] border-shroom-navy bg-shroom-cream px-5 py-3.5 font-body text-sm outline-none transition-all focus:retro-shadow-sm"
              >
                <option value="" disabled>
                  {dict.hero.goalPlaceholder}
                </option>
                {dict.hero.goals.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn-retro-coral inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 px-6 py-3.5 font-heading text-sm font-bold uppercase text-white"
              >
                <span>{dict.hero.submit}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t-2 border-dashed border-shroom-navy/20 pt-5">
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-shroom-coral", e: "🧪" },
                  { bg: "bg-shroom-mint", e: "🌿" },
                  { bg: "bg-shroom-yellow", e: "🧠" },
                  { bg: "bg-shroom-blue", e: "✨" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-shroom-navy text-xs ${a.bg}`}
                  >
                    {a.e}
                  </div>
                ))}
              </div>
              <span className="font-body text-sm text-shroom-navy/80">
                <strong className="text-shroom-navy">{count.toLocaleString()}</strong> {dict.hero.social}
              </span>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="block h-24 w-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 70 480 80 720 50C960 20 1200 60 1440 40V120H0V30Z" fill="#DDC0A4" />
            <path d="M0 50C240 90 480 100 720 70C960 40 1200 80 1440 60V120H0V50Z" fill="#94CAED" />
          </svg>
        </div>
      </section>

      {/* Pillars */}
      <section id="pilares" className="relative z-10 bg-shroom-sky py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTag>{dict.pillars.tag}</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl">
              {dict.pillars.title}
            </h2>
            <p className="mt-6 font-body text-lg opacity-85">{dict.pillars.description}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.pillars.items.map((p, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border-[3px] border-shroom-navy bg-shroom-cream p-6 retro-shadow transition-transform hover:-translate-y-1"
              >
                <h3 className="font-display text-xl leading-tight">{p.title}</h3>
                <p className="font-heading text-sm font-semibold text-shroom-coral">
                  {p.subtitle}
                </p>
                <p className="font-body text-sm leading-relaxed opacity-85">{p.body}</p>
                <span className="mt-auto inline-block w-fit rounded-full border-2 border-shroom-navy bg-shroom-yellow px-3 py-1 font-heading text-xs font-bold uppercase">
                  {p.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vault */}
      <section id="boveda" className="relative z-10 bg-shroom-peach py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <SectionTag>{dict.vault.tag}</SectionTag>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl">
              {dict.vault.title}
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed opacity-85">{dict.vault.body}</p>
            <ul className="mt-6 space-y-4">
              {dict.vault.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[3px] border-shroom-navy bg-shroom-mint font-bold">
                    ✓
                  </span>
                  <span className="font-body text-base">
                    <strong>{f.title}</strong> {f.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vault mockup */}
          <div className="rounded-3xl border-[3px] border-shroom-navy bg-white retro-shadow-lg">
            <div className="flex items-center justify-between border-b-[3px] border-shroom-navy bg-shroom-cream px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-shroom-navy bg-shroom-coral" />
                <span className="h-3 w-3 rounded-full border-2 border-shroom-navy bg-shroom-yellow" />
                <span className="h-3 w-3 rounded-full border-2 border-shroom-navy bg-shroom-mint" />
              </div>
              <span className="font-heading text-xs font-bold uppercase">{dict.vault.barTitle}</span>
              <span className="w-8" />
            </div>
            <div className="space-y-4 p-5">
              <ChatBubble side="agent" avatar="🍄">
                <strong>{dict.vault.agent}</strong>
                <p className="mt-1">{dict.vault.msg1}</p>
              </ChatBubble>
              <ChatBubble side="user" avatar="👤">
                <p>{dict.vault.userMsg}</p>
              </ChatBubble>
              <ChatBubble side="agent" avatar="🍄">
                <strong>{dict.vault.agent}</strong>
                <div className="mt-2 rounded-2xl border-[3px] border-shroom-navy bg-shroom-yellow p-4">
                  <span className="inline-block rounded-full border-2 border-shroom-navy bg-white px-3 py-0.5 font-heading text-[10px] font-bold uppercase">
                    {dict.vault.recBadge}
                  </span>
                  <h4 className="mt-2 font-display text-base">{dict.vault.recTitle}</h4>
                  <p className="mt-1 font-body text-sm">{dict.vault.recBody}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dict.vault.recTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border-2 border-shroom-navy bg-white px-2.5 py-1 font-heading text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ChatBubble>
              <div className="flex items-center gap-2 rounded-full border-2 border-dashed border-shroom-navy/50 bg-shroom-cream px-4 py-2 font-heading text-xs font-semibold">
                <span className="anim-pulse-dot h-2 w-2 rounded-full bg-shroom-coral" />
                <span>{dict.vault.logStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science */}
      <section id="ciencia" className="relative z-10 bg-shroom-mint py-24">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <SectionTag>{dict.science.tag}</SectionTag>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl">
            {dict.science.title}
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {dict.science.cards.map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border-[3px] border-shroom-navy bg-shroom-cream p-8 text-left retro-shadow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-shroom-navy bg-shroom-yellow text-3xl">
                  {c.icon}
                </div>
                <h3 className="font-display text-xl">{c.title}</h3>
                <p className="font-body text-sm leading-relaxed opacity-85">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 bg-shroom-yellow py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="rounded-3xl border-[3px] border-shroom-navy bg-shroom-cream p-8 text-center retro-shadow-lg sm:p-12">
            <div className="anim-floaty mx-auto mb-4 flex h-20 w-20 items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" fill="#EAAF3D" stroke="#2E314A" strokeWidth="4" />
                <path d="M40 14C23.4 14 10 26.8 10 42.5H70C70 26.8 56.6 14 40 14Z" fill="#F05257" stroke="#2E314A" strokeWidth="3" />
                <circle cx="27" cy="27" r="4.5" fill="#FDE9DE" />
                <circle cx="53" cy="29" r="4.5" fill="#FDE9DE" />
                <circle cx="40" cy="35" r="4" fill="#FDE9DE" />
                <path d="M33 42.5V60C33 63.9 36.1 67 40 67C43.9 67 47 63.9 47 60V42.5" fill="#FDE9DE" stroke="#2E314A" strokeWidth="3" />
              </svg>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">{dict.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-base opacity-85">
              {dict.cta.subtitle}
            </p>
            <form onSubmit={handleFinalSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder={dict.cta.placeholder}
                className="flex-1 rounded-full border-[3px] border-shroom-navy bg-white px-5 py-3 font-body text-base outline-none focus:retro-shadow-sm"
              />
              <button
                type="submit"
                className="rounded-full border-[3px] border-shroom-navy bg-shroom-coral px-6 py-3 font-heading text-base font-bold uppercase text-white retro-shadow transition-transform hover:-translate-y-1"
              >
                {dict.cta.submit}
              </button>
            </form>
            <p className="mt-4 font-body text-xs opacity-70">{dict.cta.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-[3px] border-shroom-navy bg-shroom-teal py-10 text-shroom-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
          <div>
            <a href="#hero" className="font-display text-2xl text-shroom-yellow">
              SHROOMED
            </a>
            <p className="mt-2 font-body text-sm opacity-90">{dict.footer.tagline}</p>
            <span className="mt-1 inline-block font-heading text-xs font-bold uppercase text-shroom-yellow">
              {dict.footer.brandbook}
            </span>
          </div>
          <p className="font-body text-xs opacity-80">{dict.footer.copyright}</p>
        </div>
      </footer>

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-full border-[3px] border-shroom-navy bg-shroom-mint px-5 py-3 font-heading text-sm font-bold retro-shadow transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {toast ?? ""}
      </div>
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border-2 border-shroom-navy bg-shroom-cream px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider">
      {children}
    </span>
  );
}

function ChatBubble({
  side,
  avatar,
  children,
}: {
  side: "agent" | "user";
  avatar: string;
  children: React.ReactNode;
}) {
  const isAgent = side === "agent";
  return (
    <div className={`flex items-start gap-2 ${isAgent ? "" : "flex-row-reverse"}`}>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-shroom-navy text-base ${
          isAgent ? "bg-shroom-coral" : "bg-shroom-sky"
        }`}
      >
        {avatar}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl border-[3px] border-shroom-navy p-3 font-body text-sm ${
          isAgent ? "bg-shroom-cream" : "bg-shroom-lime"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FloatingStickers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-85">
      <div className="anim-floaty absolute left-[1.5%] top-[14%]">
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M32 8C18.7 8 8 18.7 8 32H56C56 18.7 45.3 8 32 8Z" fill="#F05257" stroke="#2E314A" strokeWidth="3" />
          <circle cx="22" cy="18" r="4" fill="#FDE9DE" />
          <circle cx="42" cy="20" r="3" fill="#FDE9DE" />
          <circle cx="32" cy="26" r="3.5" fill="#FDE9DE" />
          <path d="M26 32V48C26 51.3 28.7 54 32 54C35.3 54 38 51.3 38 48V32" fill="#FDE9DE" stroke="#2E314A" strokeWidth="3" />
        </svg>
      </div>
      <div className="anim-floaty-alt absolute right-[3%] top-[22%]">
        <svg width="56" height="38" viewBox="0 0 60 40" fill="none">
          <path d="M4 20C4 20 16 6 30 6C44 6 56 20 56 20C56 20 44 34 30 34C16 34 4 20 4 20Z" fill="#94CAED" stroke="#2E314A" strokeWidth="3" />
          <circle cx="30" cy="20" r="9" fill="#EAAF3D" stroke="#2E314A" strokeWidth="2.5" />
          <circle cx="30" cy="20" r="4" fill="#2E314A" />
          <circle cx="32" cy="18" r="1.5" fill="#FDE9DE" />
        </svg>
      </div>
      <div className="anim-spin-slow absolute left-[4%] top-[60%]">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <path d="M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z" fill="#EAAF3D" stroke="#2E314A" strokeWidth="2" />
        </svg>
      </div>
      <div className="anim-spin-slow absolute right-[4%] bottom-[10%]">
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path d="M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z" fill="#CBCB51" stroke="#2E314A" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
