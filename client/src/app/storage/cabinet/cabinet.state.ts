import { IUserInfo } from "../app/app.state";

export enum State {
  LOADING,
  UPDATING,
  DATA,
} 

export class CabinetState {
  userInfoState: State;
}
