export interface IParticipant {
  firstName: string;
  lastName: string;
  email: string;
  articleName: string;
  organization: string;
  coAuthors: string;
  description: string;
  phone: string;
  id?: string;
  isApproved: boolean;
}

export enum State {
  NO_DATA,
  LOADING,
  DATA,
};

export class ParticipantsState {
  participants: IParticipant[];
  state = State.NO_DATA;
}
