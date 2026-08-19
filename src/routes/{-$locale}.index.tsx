import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";
import {
  buildHrefLangLinks,
  getMetaTags,
  localePath,
  resolveLocale,
  SITE_URL,
} from "@/i18n";

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
        { property: "og:site_name", content: "FlowPilot" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}${localePath(locale, "/")}` },
        { property: "og:image", content: "/og-image.jpg" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: meta.ogTitle },
        { name: "twitter:description", content: meta.ogDescription },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      links: [
        ...buildHrefLangLinks("/"),
        {
          rel: "canonical",
          href: `${SITE_URL}${localePath(locale, "/")}`,
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  return <Landing />;
}
