import { createAction, props } from "@ngrx/store";
import { IParticipant, ParticipantsState } from "./participants.state";

export const ExtendStateAction = createAction(
  "[Participants] Extend State",
  props<{ newState: Partial<ParticipantsState> }>(),
);

export const InitParticipantsListAction = createAction(
  "[Participants] Init Participants List",
);
