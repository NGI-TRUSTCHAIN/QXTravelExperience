import { LanguageEnum, LocaleData } from "@/interface/language";
import MenuUserEN from "./locale/menu-user-en.json";

export function getLocaleData(language: LanguageEnum): LocaleData {
  switch (language) {
    case LanguageEnum.EN:
      return MenuUserEN;
    default:
      return MenuUserEN;
  }
}
