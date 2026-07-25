import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlowPilot — Premium websites & business automation" },
      {
        name: "description",
        content:
          "FlowPilot designs premium websites today and builds the intelligent business tools of tomorrow. Fast, modern and scalable digital experiences.",
      },
      { property: "og:title", content: "FlowPilot — Premium websites & business automation" },
      {
        property: "og:description",
        content:
          "We design premium websites today while building the intelligent business tools of tomorrow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
