import { createAction, props } from "@ngrx/store";
import { IParticipant } from "../particaipants/participants.state";
import { RegistrationState } from "./registration.state";

export const ExtendStateAction = createAction(
  "[Registration] Extend State",
  props<{ newState: Partial<RegistrationState> }>(),
);

export const CreateParticipantAction = createAction(
  "[Registration] Create participant",
  props<{ form: IParticipant }>(),
);

