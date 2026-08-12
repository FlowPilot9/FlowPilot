import { useTranslation } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n";

export function Logo() {
  const { locale } = useTranslation();

  return (
    <a
      href={localePath(locale, "/")}
      className="flex items-center gap-2 font-semibold tracking-tight"
    >
      <img
        src="/logo-light.webp"
        alt="FlowPilot"
        className="block h-8 w-8 object-contain dark:hidden"
      />
      <img
        src="/logo-dark.webp"
        alt="FlowPilot"
        className="hidden h-8 w-8 object-contain dark:block"
      />
      <span className="text-[17px]">FlowPilot</span>
    </a>
  );
}
