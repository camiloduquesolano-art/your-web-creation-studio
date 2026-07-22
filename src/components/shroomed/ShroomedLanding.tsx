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
    <>
      {/* Floating Background Decorative Canvas/SVG Objects */}
      <div className="cinematic-bg" id="cinematicBg">
        <div className="floating-sticker hongo-1" style={{ top: "15%", left: "2%" }}>
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
            <path d="M32 8C18.7 8 8 18.7 8 32H56C56 18.7 45.3 8 32 8Z" fill="#F05257" stroke="#2E314A" strokeWidth="3"/>
            <circle cx="22" cy="18" r="4" fill="#FDE9DE"/>
            <circle cx="42" cy="20" r="3" fill="#FDE9DE"/>
            <circle cx="32" cy="26" r="3.5" fill="#FDE9DE"/>
            <path d="M26 32V48C26 51.3 28.7 54 32 54C35.3 54 38 51.3 38 48V32" fill="#FDE9DE" stroke="#2E314A" strokeWidth="3"/>
            <circle cx="29" cy="39" r="1.5" fill="#2E314A"/>
            <circle cx="35" cy="39" r="1.5" fill="#2E314A"/>
            <path d="M29 44C30.5 45.5 33.5 45.5 35 44" stroke="#2E314A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="floating-sticker eye-1" style={{ top: "25%", right: "2%" }}>
          <svg width="56" height="38" viewBox="0 0 60 40" fill="none">
            <path d="M4 20C4 20 16 6 30 6C44 6 56 20 56 20C56 20 44 34 30 34C16 34 4 20 4 20Z" fill="#94CAED" stroke="#2E314A" strokeWidth="3"/>
            <circle cx="30" cy="20" r="9" fill="#EAAF3D" stroke="#2E314A" strokeWidth="2.5"/>
            <circle cx="30" cy="20" r="4" fill="#2E314A"/>
            <circle cx="32" cy="18" r="1.5" fill="#FDE9DE"/>
            <path d="M12 9L8 4M20 5L18 0M30 4V0M40 5L42 0M48 9L52 4" stroke="#2E314A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="floating-sticker star-1" style={{ top: "55%", left: "2%" }}>
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z" fill="#EAAF3D" stroke="#2E314A" strokeWidth="2"/>
          </svg>
        </div>

        <div className="floating-sticker star-2" style={{ top: "80%", right: "2%" }}>
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z" fill="#CBCB51" stroke="#2E314A" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="site-header">
        <div className="header-container">
          <a href="#hero" className="logo">
            <span className="logo-icon">🍄</span>
            <span className="logo-text">SHROOMED</span>
          </a>

          <nav className="nav-links">
            <a href="#pilares">{dict.nav.assistant}</a>
            <a href="#boveda">{dict.nav.vault}</a>
            <a href="#ciencia">{dict.nav.science}</a>
          </nav>

          <div className="header-actions">
            <Link to={otherLang === "en" ? "/en" : "/"} className="lang-switch-btn">
              {otherLabel}
            </Link>
            <a href="#waitlist" className="btn btn-primary btn-sm">
              {dict.nav.join}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section Cinemática */}
      <section className="hero-section" id="hero">
        <div className="container hero-container">
          
          <div className="badge-pill hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">{dict.hero.badge}</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line-1">{dict.hero.titleTop}</span>
            <span className="title-line-2 highlight-text">{dict.hero.titleBottom}</span>
          </h1>

          <p className="hero-subtitle">
            <strong>{dict.hero.subtitleLead}</strong>
            {dict.hero.subtitle}
          </p>

          {/* Waitlist Card Principal */}
          <div className="waitlist-card" id="waitlist">
            <div className="waitlist-card-header">
              <span className="sparkle-icon">✨</span>
              <span>{dict.hero.waitlistHeader}</span>
            </div>
            
            <form onSubmit={handleHeroSubmit} className="waitlist-form">
              <div className="form-row">
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={dict.hero.emailPlaceholder}
                    className="custom-input"
                  />
                </div>
                
                <div className="select-wrapper">
                  <select name="goal" className="custom-select" required defaultValue="">
                    <option value="" disabled>{dict.hero.goalPlaceholder}</option>
                    {dict.hero.goals.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-submit">
                  <span>{dict.hero.submit}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </form>

            <div className="waitlist-social-proof">
              <div className="avatar-group">
                <div className="avatar" style={{ background: "#F05257" }}>🧪</div>
                <div className="avatar" style={{ background: "#89C97F" }}>🌿</div>
                <div className="avatar" style={{ background: "#EAAF3D" }}>🧠</div>
                <div className="avatar" style={{ background: "#017CA2" }}>✨</div>
              </div>
              <span className="proof-text">
                <strong>{count}</strong> {dict.hero.socialProof}
              </span>
            </div>
          </div>

        </div>

        {/* Onda / Ribbon inferior del Hero */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 70 480 80 720 50C960 20 1200 60 1440 40V120H0V30Z" fill="#DDC0A4"/>
            <path d="M0 50C240 90 480 100 720 70C960 40 1200 80 1440 60V120H0V50Z" fill="#94CAED"/>
          </svg>
        </div>
      </section>

      {/* Sección: Los 4 Pilares del Agente Shroomed */}
      <section className="pilares-section" id="pilares">
        <div className="container">
          
          <div className="section-header text-center">
            <span className="section-tag">{dict.pillars.tag}</span>
            <h2 className="section-title">{dict.pillars.title}</h2>
            <p className="section-description">{dict.pillars.subtitle}</p>
          </div>

          <div className="pilares-grid">
            {/* Pilar 1 */}
            <div className="pilar-card">
              <h3>{dict.pillars.p1.num}. {dict.pillars.p1.title}</h3>
              <p className="pilar-subtitle">Conocimiento profundo o básico</p>
              <p>{dict.pillars.p1.desc}</p>
              <div className="pilar-tag">Perfilamiento Dinámico</div>
            </div>

            {/* Pilar 2 */}
            <div className="pilar-card">
              <h3>{dict.pillars.p2.num}. {dict.pillars.p2.title}</h3>
              <p className="pilar-subtitle">Catálogo de opciones adecuadas</p>
              <p>{dict.pillars.p2.desc}</p>
              <div className="pilar-tag">Catálogo Inteligente</div>
            </div>

            {/* Pilar 3 */}
            <div className="pilar-card">
              <h3>{dict.pillars.p3.num}. {dict.pillars.p3.title}</h3>
              <p className="pilar-subtitle">Profundización de objetivos</p>
              <p>{dict.pillars.p3.desc}</p>
              <div className="pilar-tag">Propósito & Mindset</div>
            </div>

            {/* Pilar 4 */}
            <div className="pilar-card">
              <h3>{dict.pillars.p4.num}. {dict.pillars.p4.title}</h3>
              <p className="pilar-subtitle">Tu diario interactivo</p>
              <p>{dict.pillars.p4.desc}</p>
              <div className="pilar-tag">Feedback Loop Continuo</div>
            </div>
          </div>

        </div>
      </section>

      {/* Sección Cinemática: La Bóveda de Conocimiento */}
      <section className="boveda-section" id="boveda">
        <div className="container">
          
          <div className="boveda-layout">
            <div className="boveda-info">
              <span className="section-tag">{dict.vault.tag}</span>
              <h2 className="section-title text-left">{dict.vault.title}</h2>
              <p className="boveda-description">{dict.vault.desc}</p>

              <ul className="boveda-checklist">
                {dict.vault.checklist.map((item, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>{item.title}:</strong> {item.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Mockup Interactivo del Agente */}
            <div className="boveda-visual">
              <div className="boveda-card-frame">
                <div className="boveda-header-bar">
                  <div className="bar-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="bar-title">Asistente Shroomed — Bóveda Activa</span>
                </div>

                <div className="boveda-chat-body">
                  {/* Mensaje 1 */}
                  <div className="chat-bubble agent-bubble">
                    <div className="bubble-avatar">🍄</div>
                    <div className="bubble-content">
                      <strong>Agente Shroomed:</strong>
                      <p>{dict.vault.demo.agentMsg1}</p>
                    </div>
                  </div>

                  {/* Mensaje 2 */}
                  <div className="chat-bubble user-bubble">
                    <div className="bubble-content">
                      <p>{dict.vault.demo.userMsg}</p>
                    </div>
                    <div className="bubble-avatar user-av">👤</div>
                  </div>

                  {/* Mensaje 3 */}
                  <div className="chat-bubble agent-bubble">
                    <div className="bubble-avatar">🍄</div>
                    <div className="bubble-content">
                      <strong>Agente Shroomed:</strong>
                      <div className="recommendation-box">
                        <span className="rec-badge">{dict.vault.demo.recBadge}</span>
                        <h4>{dict.vault.demo.recTitle}</h4>
                        <p>{dict.vault.demo.recDesc}</p>
                        <div className="rec-tags">
                          <span>✓ {dict.vault.demo.tag1}</span>
                          <span>✓ {dict.vault.demo.tag2}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bitácora Activity Indicator */}
                  <div className="bitacora-status-strip">
                    <span className="pulse-dot" />
                    <span>{dict.vault.demo.status}</span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Sección: Ciencia, Confianza y Seguridad */}
      <section className="ciencia-section" id="ciencia">
        <div className="container text-center">
          
          <span className="section-tag">{dict.science.tag}</span>
          <h2 className="section-title">{dict.science.title}</h2>
          
          <div className="ciencia-cards-grid">
            {dict.science.cards.map((c, i) => (
              <div key={i} className="ciencia-card">
                <div className="c-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Final Section con Formulario de Waitlist */}
      <section className="cta-final-section">
        <div className="container">
          
            <h2 className="cta-title">{dict.cta.title}</h2>
            <p className="cta-subtitle">{dict.cta.subtitle}</p>

            <form onSubmit={handleFinalSubmit} className="cta-waitlist-form">
              <div className="cta-form-row">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={dict.cta.emailPlaceholder}
                  className="custom-input"
                />
                <button type="submit" className="btn btn-primary">
                  {dict.cta.submit}
                </button>
              </div>
            </form>

            <p className="disclaimer-text">{dict.cta.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* Footer Retro */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-left">
            <a href="#hero" className="footer-logo">
              SHROOMED
            </a>
            <p className="footer-tagline">{dict.footer.tagline}</p>
            <span className="brandbook-label">— BRANDBOOK 2026</span>
          </div>

          <div className="footer-right">
            <p className="copyright">{dict.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="toast show">
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
