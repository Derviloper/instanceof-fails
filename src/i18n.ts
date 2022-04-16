import rawDe from "@/locales/de.json?raw";
import { createI18n } from "vue-i18n";
import { nextTick } from "vue";

const de = JSON.parse(rawDe);

export const SUPPORTED_LOCALES = [
  "de",
  "de-AT",
  "es",
  "fr",
  "fr-LU",
  "it",
  "nl",
  "nl-BE",
  "pl",
];

const i18n = createI18n({
  legacy: false,
  locale: "de",
  datetimeFormats: { de: de.datetimeFormats },
  messages: { de: de.messages },
  numberFormats: { de: de.numberFormats },
});

export default i18n;

export async function loadLocale(locale: string) {
  const config = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  );
  i18n.global.setDateTimeFormat(locale, config.default.datetimeFormats);
  i18n.global.setLocaleMessage(locale, config.default.messages);
  i18n.global.setNumberFormat(locale, config.default.numberFormats);
  return nextTick();
}

export async function setI18nLanguage(locale: string): Promise<boolean> {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return false;
  }
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocale(locale);
  }
  i18n.global.locale.value = locale;
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")?.setAttribute("lang", locale);
  return true;
}
