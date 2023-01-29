import { ISiteOptions } from "../administration/administration.state";

export enum LanguageEnum {
  UA = "ua",
  RU = "ru",
  EN = "en",
}

export interface IUserInfo {
  email: string;
  role: number;
  id: string;
  firstName: string;
  lastName: string;
  phone: string,
  organization: string,
  googleAcademy: string,
  orcid: string,
}

export class AppState {
  language = LanguageEnum.UA;
  isUserLogged: boolean;
  siteOptions: ISiteOptions;
  user: IUserInfo;
}
