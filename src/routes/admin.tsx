import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Signup = {
  id: string;
  email: string;
  goal: string | null;
  lang: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel Admin · Shroomed" },
      { name: "description", content: "Panel de administración de Shroomed." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [visitsCount, setVisitsCount] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(sess.session.user.email ?? null);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);

      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);

      if (admin) {
        const { data: s, error: sErr } = await supabase
          .from("waitlist_signups")
          .select("*")
          .order("created_at", { ascending: false });
        if (sErr) setError(sErr.message);
        setSignups((s as Signup[]) ?? []);

        const { data: v } = await supabase.from("page_visits").select("visitor_id");
        const visits = v ?? [];
        setVisitsCount(visits.length);
        setUniqueVisitors(new Set(visits.map((x) => x.visitor_id)).size);
      }
      setLoading(false);
    })();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este registro?")) return;
    const { error } = await supabase.from("waitlist_signups").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setSignups((prev) => prev.filter((s) => s.id !== id));
  }

  const csv = useMemo(() => {
    const header = ["email", "goal", "lang", "referrer", "user_agent", "created_at"];
    const rows = signups.map((s) =>
      header
        .map((h) => {
          const val = (s as unknown as Record<string, unknown>)[h];
          const str = val == null ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(","),
    );
    return [header.join(","), ...rows].join("\n");
  }, [signups]);

  function downloadCsv() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shroomed-signups-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FDE9DE", color: "#2E314A" }}>
        Cargando…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#FDE9DE" }}>
        <div className="max-w-md text-center rounded-3xl p-8 border-4" style={{ background: "#fff", borderColor: "#2E314A" }}>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#2E314A" }}>Acceso restringido</h1>
          <p className="mb-4" style={{ color: "#2E314A" }}>
            Tu cuenta ({userEmail}) no tiene permisos de administrador.
          </p>
          <button onClick={handleSignOut} className="px-6 py-2 rounded-full border-2 font-semibold" style={{ borderColor: "#2E314A", background: "#F05257", color: "#fff" }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FDE9DE", color: "#2E314A" }}>
      <header className="border-b-4 px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderColor: "#2E314A", background: "#fff" }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Bagel Fat One', cursive" }}>🍄 SHROOMED · ADMIN</h1>
          <p className="text-xs opacity-75">Conectado como {userEmail}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="px-4 py-2 rounded-full border-2 text-sm font-semibold" style={{ borderColor: "#2E314A", background: "#94CAED" }}>
            Ver landing
          </Link>
          <button onClick={handleSignOut} className="px-4 py-2 rounded-full border-2 text-sm font-semibold" style={{ borderColor: "#2E314A", background: "#F05257", color: "#fff" }}>
            Salir
          </button>
        </div>
      </header>

      <main className="px-6 py-8 max-w-6xl mx-auto space-y-8">
        {error && <div className="p-3 rounded-lg border-2" style={{ borderColor: "#F05257", background: "#FDE9DE" }}>{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Inscritos en waitlist" value={signups.length} bg="#EAAF3D" />
          <StatCard label="Visitantes únicos" value={uniqueVisitors} bg="#89C97F" />
          <StatCard label="Visitas totales" value={visitsCount} bg="#94CAED" />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-bold">Registros de la waitlist</h2>
          <button
            onClick={downloadCsv}
            disabled={signups.length === 0}
            className="px-5 py-2 rounded-full border-2 font-semibold disabled:opacity-50"
            style={{ borderColor: "#2E314A", background: "#017CA2", color: "#fff" }}
          >
            ⬇ Descargar CSV
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border-4" style={{ borderColor: "#2E314A", background: "#fff" }}>
          <table className="w-full text-sm">
            <thead style={{ background: "#2E314A", color: "#FDE9DE" }}>
              <tr>
                <th className="text-left px-3 py-2">Correo</th>
                <th className="text-left px-3 py-2">Objetivo</th>
                <th className="text-left px-3 py-2">Idioma</th>
                <th className="text-left px-3 py-2">Fecha</th>
                <th className="text-left px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {signups.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-6 text-center opacity-60">Aún no hay registros.</td></tr>
              )}
              {signups.map((s) => (
                <tr key={s.id} className="border-t" style={{ borderColor: "#DDC0A4" }}>
                  <td className="px-3 py-2 font-medium">{s.email}</td>
                  <td className="px-3 py-2">{s.goal ?? "—"}</td>
                  <td className="px-3 py-2 uppercase">{s.lang ?? "—"}</td>
                  <td className="px-3 py-2">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{ borderColor: "#F05257", color: "#F05257" }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, bg }: { label: string; value: number; bg: string }) {
  return (
    <div className="rounded-2xl border-4 p-5" style={{ borderColor: "#2E314A", background: bg, boxShadow: "6px 6px 0 #2E314A" }}>
      <div className="text-4xl font-bold" style={{ fontFamily: "'Bagel Fat One', cursive" }}>{value}</div>
      <div className="text-sm mt-1 font-semibold">{label}</div>
    </div>
  );
}
