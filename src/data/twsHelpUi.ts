import type { Locale } from "../i18n/config";
import en from "./tws-help-ui.en.json";

/** Page chrome for /help/tws (article bodies live in tws-help.<locale>.json). */
export type TwsUi = Omit<typeof en, "groups"> & { groups: Record<string, string> };

const files = import.meta.glob("./tws-help-ui.*.json", { eager: true, import: "default" }) as Record<string, TwsUi>;

export function twsUi(locale: Locale): TwsUi {
  const ui = files[`./tws-help-ui.${locale}.json`];
  return ui ? { ...en, ...ui, toc: { ...en.toc, ...ui.toc }, groups: { ...en.groups, ...ui.groups } } : en;
}
