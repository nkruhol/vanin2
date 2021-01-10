export enum State {
  NONE,
  ERROR,
  SAVING,
  SAVED,
};

export class RegistrationState {
  state = State.NONE;
}
