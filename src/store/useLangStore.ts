import { create } from "zustand"
import i18next from "i18next";

import { LangType } from "@/types/lang";

interface LangStoreType {
  lang: LangType;
  setLang: (lang: LangType) => void;
}

function setLang(set: any, lang: LangType) {
  i18next.changeLanguage(lang);
  set(() => {
    return {
      lang
    };
  })
}

const useThemeStore = create<LangStoreType>((set) => ({
  lang: "ptbr",
  setLang: (lang: LangType) => setLang(set, lang)
}));

export default useThemeStore