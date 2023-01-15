export interface ILayout {
  history: boolean;
  registration: boolean;
  participants_list: boolean;
  lettters: boolean;
  article_rules: boolean;
  archive: boolean;
  contacts: boolean;
}

export interface IPage {
  ua: string;
  ru: string;
  en: string;
}

export interface IPages {
  [propName: string]: IPage;
}

export interface ISiteOptions {
  layout: ILayout;
  pages: IPages;
}

export enum State {
  NO_DATA,
  LOADING,
  DATA,
};

export class AdministrationState {
  state = State.NO_DATA;
  layout: ILayout;
  pages: IPages;
  users: any[];
}
