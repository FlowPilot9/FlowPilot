import { useEffect } from "react";
import { useTranslation } from "./I18nProvider";

function setMetaTag(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.querySelector<HTMLMetaElement>(`${selector}[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export function DocumentMeta() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t.meta.title;
    setMetaTag("meta", "name", "description", t.meta.description);
    setMetaTag("meta", "property", "og:title", t.meta.ogTitle);
    setMetaTag("meta", "property", "og:description", t.meta.ogDescription);
  }, [t]);

  return null;
}
