import { ISiteOptions } from "../administration/administration.state";

export enum LanguageEnum {
  UA = "ua",
  RU = "ru",
  EN = "en",
}
export class AppState {
  language = LanguageEnum.UA;
  isUserLogged: boolean;
  siteOptions: ISiteOptions;
}
