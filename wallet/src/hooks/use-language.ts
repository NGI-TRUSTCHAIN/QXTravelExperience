import { getLocaleData } from "@/content/config";
import { LanguageEnum, LanguageStoreState } from "@/interface/language";
import localStorageHelper from "@/utils/local-storage";
import { create } from "zustand";

export const useLanguage = create<LanguageStoreState>((set) => ({
  language: localStorageHelper.getItem<LanguageEnum>("language") || "en",
  languageData: getLocaleData(
    localStorageHelper.getItem<LanguageEnum>("language") || "en"
  ),
  setLanguage: (language: LanguageEnum) => {
    localStorageHelper.setItem("language", language);
    set({
      language,
      languageData: getLocaleData(language),
    });
  },
}));
