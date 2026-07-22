import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

type FeedbackItem = {
  id: string;
  name: string;
  date: string;
  type: "audio" | "written" | "interview";
  sentiment: "positive" | "neutral" | "friction";
  transcript: string;
  friction: string;
  insight: string;
};

const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: "FBK-001",
    name: "Amigo Tester #1",
    date: "2026-07-22",
    type: "audio",
    sentiment: "positive",
    transcript: "La página retro se ve brutal, los colores y las ilustraciones del hongo llaman mucho la atención. ¿La bóveda de datos médicos es 100% privada?",
    friction: "Duda sobre cifrado y privacidad de datos de salud en la Bóveda",
    insight: "El diseño atrae de inmediato; debemos hacer super visible el cifrado privado en la sección Ciencia."
  }
];

export function ShroomedDashboard() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<"audio" | "written" | "interview">("audio");
  const [formSentiment, setFormSentiment] = useState<"positive" | "neutral" | "friction">("positive");
  const [formTranscript, setFormTranscript] = useState("");
  const [formFriction, setFormFriction] = useState("");
  const [formInsight, setFormInsight] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  function handleAddFeedback(e: FormEvent) {
    e.preventDefault();
    if (!formTranscript.trim()) return;

    const newItem: FeedbackItem = {
      id: `FBK-00${feedbackList.length + 1}`,
      name: formName || `Amigo Tester #${feedbackList.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      type: formType,
      sentiment: formSentiment,
      transcript: formTranscript,
      friction: formFriction || "Sin fricción severa",
      insight: formInsight || "Analizado e ingerido al Segundo Cerebro",
    };

    setFeedbackList([newItem, ...feedbackList]);
    setFormName("");
    setFormTranscript("");
    setFormFriction("");
    setFormInsight("");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  }

  const positiveCount = feedbackList.filter(f => f.sentiment === "positive").length;
  const neutralCount = feedbackList.filter(f => f.sentiment === "neutral").length;
  const frictionCount = feedbackList.filter(f => f.sentiment === "friction").length;
  const totalCount = feedbackList.length;

  return (
    <div style={{ backgroundColor: "var(--color-cream)", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Navigation Header */}
      <header className="site-header" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <div className="header-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link to="/" className="logo" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <span className="logo-icon">🍄</span>
              <span className="logo-text" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-navy)" }}>SHROOMED</span>
            </Link>
            <span style={{ background: "var(--color-yellow)", padding: "4px 12px", borderRadius: "999px", border: "2px solid var(--color-navy)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
              Centro de Comando & Segundo Cerebro
            </span>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link to="/" className="btn btn-primary btn-sm">
              ← Volver a la Landing
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 24px" }}>
        
        {/* Banner de Estado del Proyecto */}
        <div style={{ background: "var(--color-white)", border: "var(--border-thick)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-retro-lg)", padding: "28px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="badge-pill" style={{ background: "var(--color-sky)", color: "var(--color-navy)", padding: "6px 14px", borderRadius: "999px", border: "2px solid var(--color-navy)", fontSize: "0.85rem", fontWeight: 700 }}>
                🟢 FASE 2 EN CURSO: DOGFOODING CON AMIGOS
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginTop: "12px", color: "var(--color-navy)", textTransform: "uppercase" }}>
                Panel Visual de Ejecución & Feedback
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Sincronizado en tiempo real con tu **Segundo Cerebro de Obsidian** (`/Obsidian Vault/🧪 Experimentos/`)
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ background: "var(--color-cream)", border: "2px solid var(--color-navy)", padding: "12px 20px", borderRadius: "var(--radius-sm)", textCenter: "center" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, display: "block", color: "var(--text-secondary)" }}>ITEMS FEEDBACK</span>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-navy)", fontFamily: "var(--font-heading)" }}>{totalCount}</span>
              </div>
              <div style={{ background: "var(--color-mint)", border: "2px solid var(--color-navy)", padding: "12px 20px", borderRadius: "var(--radius-sm)", textCenter: "center" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, display: "block", color: "var(--color-navy)" }}>POSITIVO</span>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-navy)", fontFamily: "var(--font-heading)" }}>{positiveCount}</span>
              </div>
            </div>
          </div>

          {/* Stepper de Ejecución Visual */}
          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "2px dashed var(--color-navy)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: "16px" }}>
              🛣️ Roadmap Real de Ejecución (4 Pasos)
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              
              {/* Paso 1 */}
              <div style={{ background: "#E8F5E9", border: "2px solid var(--color-navy)", borderRadius: "var(--radius-sm)", padding: "16px", boxShadow: "3px 3px 0px var(--color-navy)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#2E7D32" }}>PASO 1 ✅</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>21/Jul/2026</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginTop: "8px" }}>Landing Page Validación</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>Diseño retro psicodélico finalizado en React + TanStack Start.</p>
              </div>

              {/* Paso 2 */}
              <div style={{ background: "var(--color-yellow)", border: "3px solid var(--color-navy)", borderRadius: "var(--radius-sm)", padding: "16px", boxShadow: "var(--shadow-retro-sm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--color-navy)" }}>PASO 2 🟢 (FASE ACTUAL)</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>22/Jul/2026</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginTop: "8px" }}>Dogfooding con Amigos</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--color-navy)", marginTop: "4px" }}>Ingesta de primeras impresiones (audios de WhatsApp & texto).</p>
              </div>

              {/* Paso 3 */}
              <div style={{ background: "var(--color-cream)", border: "2px solid var(--color-navy)", borderRadius: "var(--radius-sm)", padding: "16px", opacity: 0.8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--text-secondary)" }}>PASO 3 ⏳</span>
                  <span style={{ fontSize: "0.75rem" }}>Ago/2026 (Est.)</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginTop: "8px" }}>Waiting List Pública</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>Captación masiva y validación de intención a escala.</p>
              </div>

              {/* Paso 4 */}
              <div style={{ background: "var(--color-cream)", border: "2px solid var(--color-navy)", borderRadius: "var(--radius-sm)", padding: "16px", opacity: 0.8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--text-secondary)" }}>PASO 4 🔮</span>
                  <span style={{ fontSize: "0.75rem" }}>Sep/2026 (Est.)</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginTop: "8px" }}>MVP Base de Datos</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>Lanzamiento controlado para medir uso de la Bóveda.</p>
              </div>

            </div>
          </div>
        </div>

        {/* Grid de Formulario de Ingesta & Tablero de Feedback */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "32px" }}>
          
          {/* Formulario de Ingesta */}
          <div style={{ background: "var(--color-white)", border: "var(--border-thick)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-retro)", padding: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-navy)", marginBottom: "8px" }}>
              🎙️ Ingestar Nuevo Feedback
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Pega aquí el texto transcrito de una nota de voz o mensaje recibido de tus amigos en el Dogfooding.
            </p>

            <form onSubmit={handleAddFeedback} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Amigo / Emisor:</label>
                <input
                  type="text"
                  placeholder="Ej: Camilo G., Juan, Maria..."
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="custom-input"
                  style={{ width: "100%", padding: "10px 14px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Formato:</label>
                  <select
                    value={formType}
                    onChange={e => setFormType(e.target.value as any)}
                    className="custom-select"
                    style={{ width: "100%", padding: "10px" }}
                  >
                    <option value="audio">🎙️ Audio WhatsApp</option>
                    <option value="written">💬 Mensaje Escrito</option>
                    <option value="interview">🗣️ Entrevista Directa</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Sentimiento:</label>
                  <select
                    value={formSentiment}
                    onChange={e => setFormSentiment(e.target.value as any)}
                    className="custom-select"
                    style={{ width: "100%", padding: "10px" }}
                  >
                    <option value="positive">🟢 Positivo (Entusiasmo)</option>
                    <option value="neutral">🟡 Neutro (Duda / Curiosidad)</option>
                    <option value="friction">🔴 Fricción (Problema / Confusión)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Transcripción o Notas del Audio *:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Pega aquí lo que dijo el usuario..."
                  value={formTranscript}
                  onChange={e => setFormTranscript(e.target.value)}
                  className="custom-input"
                  style={{ width: "100%", padding: "10px 14px", resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Duda / Fricción Principal:</label>
                <input
                  type="text"
                  placeholder="Ej: ¿Es seguro subir datos médicos?"
                  value={formFriction}
                  onChange={e => setFormFriction(e.target.value)}
                  className="custom-input"
                  style={{ width: "100%", padding: "10px 14px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Insight / Acción de Producto:</label>
                <input
                  type="text"
                  placeholder="Ej: Reforzar tarjetas de seguridad"
                  value={formInsight}
                  onChange={e => setFormInsight(e.target.value)}
                  className="custom-input"
                  style={{ width: "100%", padding: "10px 14px" }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "8px", width: "100%", justifyContent: "center" }}>
                ✨ INGESTAR A CEREBRO Y ANALIZAR
              </button>
            </form>
          </div>

          {/* Feed de Feedback Ingerido */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ background: "var(--color-white)", border: "var(--border-thick)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-retro)", padding: "24px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-navy)", marginBottom: "4px" }}>
                🗣️ Feedback Real Ingerido ({feedbackList.length})
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                Experimento Activo: **[[EXP-001 - Dogfooding Inicial & Landing de Validación]]**
              </p>

              {feedbackList.map((item) => (
                <div key={item.id} style={{ background: "var(--color-cream)", border: "2px solid var(--color-navy)", borderRadius: "var(--radius-sm)", padding: "18px", marginBottom: "16px", boxShadow: "3px 3px 0px var(--color-navy)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>{item.id}: {item.name}</span>
                      <span style={{ fontSize: "0.75rem", background: item.type === "audio" ? "var(--color-coral)" : "var(--color-sky)", color: "#fff", padding: "2px 8px", borderRadius: "999px", fontWeight: 700 }}>
                        {item.type === "audio" ? "🎙️ Audio" : item.type === "written" ? "💬 Escrito" : "🗣️ Entrevista"}
                      </span>
                    </div>

                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: item.sentiment === "positive" ? "#2E7D32" : item.sentiment === "neutral" ? "#E65100" : "#C62828" }}>
                      {item.sentiment === "positive" ? "🟢 Positivo" : item.sentiment === "neutral" ? "🟡 Neutro" : "🔴 Fricción"}
                    </span>
                  </div>

                  <blockquote style={{ margin: "10px 0", fontStyle: "italic", borderLeft: "3px solid var(--color-navy)", paddingLeft: "12px", color: "var(--color-navy)" }}>
                    "{item.transcript}"
                  </blockquote>

                  {item.friction && (
                    <div style={{ fontSize: "0.82rem", marginTop: "8px" }}>
                      <strong>⚠️ Fricción:</strong> {item.friction}
                    </div>
                  )}

                  {item.insight && (
                    <div style={{ fontSize: "0.82rem", marginTop: "4px", color: "var(--color-teal)", fontWeight: 600 }}>
                      <strong>💡 Insight:</strong> {item.insight}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>

      {showNotification && (
        <div className="toast show" style={{ position: "fixed", bottom: "30px", right: "30px" }}>
          <span>✨ Feedback ingerido exitosamente en el Segundo Cerebro</span>
        </div>
      )}
    </div>
  );
}
