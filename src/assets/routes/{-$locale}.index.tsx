import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";
import { buildHrefLangLinks, getMetaTags, resolveLocale } from "@/i18n";

export const Route = createFileRoute("/{-$locale}/")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMetaTags(locale);

    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.ogTitle },
        { property: "og:description", content: meta.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      links: buildHrefLangLinks("/"),
    };
  },
  component: Index,
});

function Index() {
  return <Landing />;
}
