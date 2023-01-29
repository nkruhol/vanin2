import { IParticipant } from "../particaipants/participants.state";

export enum State {
  NO_DATA,
  LOADING,
  DATA,
};

export class ArchiveState {
  participants: IParticipant[];
  state = State.NO_DATA;
}
