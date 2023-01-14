import { createAction, props } from "@ngrx/store";
import { IParticipant } from "../particaipants/participants.state";
import { ArchiveState } from "./archive.state";

export const ExtendStateAction = createAction(
  "[Archive] Extend State",
  props<{ newState: Partial<ArchiveState> }>(),
);

export const InitArchiveAction = createAction(
  "[Archive] Init Participants List",
  props<{ year: number }>(),
);

export const GetArticleAction = createAction(
  "[Archive] Get Article",
  props<{ participant: IParticipant }>(),
)
