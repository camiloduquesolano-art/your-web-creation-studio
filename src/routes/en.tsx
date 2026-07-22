import { createFileRoute } from "@tanstack/react-router";
import { ShroomedLanding } from "@/components/shroomed/ShroomedLanding";
import { dictionaries } from "@/lib/i18n/shroomed";

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: [
      { title: "Shroomed — Your Personal Guide to Explore with Awareness" },
      {
        name: "description",
        content:
          "Shroomed is your personalized health & substance AI assistant. Get to know your profile, tailor dosages, explore your knowledge vault, and track your journal.",
      },
      {
        property: "og:title",
        content: "Shroomed — Your Personal Guide to Explore with Awareness",
      },
      {
        property: "og:description",
        content:
          "Personalized AI agent to explore with awareness. Profile, dosage, vault and logbook.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/en" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/en" },
      { rel: "alternate", hreflang: "es", href: "/" },
      { rel: "alternate", hreflang: "en", href: "/en" },
    ],
  }),
  component: EnPage,
});

function EnPage() {
  return <ShroomedLanding dict={dictionaries.en} lang="en" />;
}
