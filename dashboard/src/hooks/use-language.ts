import { getLocaleData } from "@/content/config";
import { LanguageEnum, LanguageStoreState } from "@/interface/language";
import { StorageEnum } from "@/interface/storage";
import { create, persist, createJSONStorage } from "@/lib/store";

export const useLanguage = create<LanguageStoreState>()(
  persist(
    (set) => ({
      language: LanguageEnum.EN,
      setLanguage: (language: LanguageEnum) => {
        set({
          language,
          languageData: getLocaleData(language),
        });
      },
      languageModal: LanguageEnum.EN,
      setLanguageModal: (language: LanguageEnum) => {
        set({
          languageModal: language,
        });
      },
      languageData: getLocaleData(LanguageEnum.EN),
    }),
    {
      name: StorageEnum.language,
      partialize: (state: LanguageStoreState) => ({
        language: state.language,
        languageModal: state.languageModal,
      }),
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return (persistedState) => {
          if (persistedState && persistedState.language) {
            state.setLanguage(persistedState.language);
            state.setLanguageModal(persistedState.languageModal);
          }
        };
      },
    }
  )
);
