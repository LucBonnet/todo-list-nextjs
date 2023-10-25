import ptbr from "./locales/pt-br";
import en from "./locales/en-us";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const i18nResources = {
  ptbr,
  en
}

i18next.use(initReactI18next).init({
  resources: i18nResources,
  lng: "ptbr",
  interpolation: {
    escapeValue: false
  }
})
