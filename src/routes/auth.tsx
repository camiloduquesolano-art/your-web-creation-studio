import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin · Shroomed" },
      { name: "description", content: "Panel de administración de Shroomed." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) setError(result.error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#FDE9DE" }}>
      <div className="w-full max-w-md rounded-3xl p-8 border-4" style={{ background: "#fff", borderColor: "#2E314A", boxShadow: "8px 8px 0 #2E314A" }}>
        <Link to="/" className="text-sm underline" style={{ color: "#2E314A" }}>← Volver al inicio</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2" style={{ color: "#2E314A", fontFamily: "'Bagel Fat One', cursive" }}>
          🍄 SHROOMED ADMIN
        </h1>
        <p className="text-sm mb-6" style={{ color: "#2E314A" }}>
          {mode === "signin" ? "Inicia sesión para ver el panel." : "Crea tu cuenta de admin."}
        </p>

        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-full border-2 font-semibold mb-4"
          style={{ borderColor: "#2E314A", background: "#EAAF3D", color: "#2E314A" }}
        >
          Continuar con Google
        </button>

        <div className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: "#2E314A" }}>o</div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border-2"
            style={{ borderColor: "#2E314A", background: "#FDE9DE", color: "#2E314A" }}
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full border-2"
            style={{ borderColor: "#2E314A", background: "#FDE9DE", color: "#2E314A" }}
          />
          {error && <p className="text-sm" style={{ color: "#F05257" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-bold border-2"
            style={{ background: "#017CA2", color: "#FDE9DE", borderColor: "#2E314A" }}
          >
            {loading ? "..." : mode === "signin" ? "Entrar" : "Registrarme"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-sm underline w-full text-center"
          style={{ color: "#2E314A" }}
        >
          {mode === "signin" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}
