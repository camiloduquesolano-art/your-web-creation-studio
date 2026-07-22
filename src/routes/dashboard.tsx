import { createFileRoute } from "@tanstack/react-router";
import { ShroomedDashboard } from "@/components/shroomed/ShroomedDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Shroomed — Centro de Comando de Ejecución & Segundo Cerebro" },
      {
        name: "description",
        content: "Panel de control visual de experimentos, ingesta de feedback y métricas de ejecución de Shroomed.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return <ShroomedDashboard />;
}
