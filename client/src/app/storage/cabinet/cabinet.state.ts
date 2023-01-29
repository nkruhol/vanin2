import { IUserInfo } from "../app/app.state";

export enum State {
  LOADING,
  UPDATING,
  DATA,
  CREATING,
}

export class IArticle {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  organization: string;
  googleAcademy: string;
  orcid: string;
  userId: string;
  id: string;
}

export class CabinetState {
  userInfoState: State;

  conferenceDetailsState: State;
  articles: IArticle[];
  currentArticle: IArticle;
}
