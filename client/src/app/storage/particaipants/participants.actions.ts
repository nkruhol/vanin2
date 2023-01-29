import { createAction, props } from "@ngrx/store";
import { IParticipant, ParticipantsState } from "./participants.state";

export const ExtendStateAction = createAction(
  "[Participants] Extend State",
  props<{ newState: Partial<ParticipantsState> }>(),
);

export const InitParticipantsListAction = createAction(
  "[Participants] Init Participants List",
);

export const ApproveParticipantAction = createAction(
  "[Participants] Approve Participant",
  props<{ participant: IParticipant }>(),
)

export const GetArticleAction = createAction(
  "[Participants] Get Article",
  props<{ participant: IParticipant }>(),
)