import { createFileRoute } from "@tanstack/react-router";
import { ShroomedLanding } from "@/components/shroomed/ShroomedLanding";
import { dictionaries } from "@/lib/i18n/shroomed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shroomed — Tu Asistente Fármaco Inteligente & Bóveda de Conocimiento" },
      {
        name: "description",
        content:
          "Shroomed es tu asistente personalizado de salud y sustancias. Conoce tu perfil, personaliza dosis, explora tu bóveda de conocimiento y documenta tus experiencias.",
      },
      {
        property: "og:title",
        content: "Shroomed — Tu Asistente Fármaco Inteligente & Bóveda de Conocimiento",
      },
      {
        property: "og:description",
        content:
          "Agente de IA personalizado para explorar con conciencia. Perfil, dosis, bóveda y bitácora.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hreflang: "es", href: "/" },
      { rel: "alternate", hreflang: "en", href: "/en" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ShroomedLanding dict={dictionaries.es} lang="es" />;
}
