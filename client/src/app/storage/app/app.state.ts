import { ISiteOptions } from "../administration/administration.state";

export enum LanguageEnum {
  UA = "ua",
  RU = "ru",
  EN = "en",
}

export interface IUserWithRole {
  email: string;
  role: number;
}

export class AppState {
  language = LanguageEnum.UA;
  isUserLogged: boolean;
  siteOptions: ISiteOptions;
  user: IUserWithRole;
}
