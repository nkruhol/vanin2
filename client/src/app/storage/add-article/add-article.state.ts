import { IParticipant } from "../particaipants/participants.state";

export enum State {
  NONE,
  LOADING,
  DATA,
  NO_DATA,
  ERROR,
};

export class AddArticleState {
  state = State.NONE;
  participants: IParticipant[];
}
