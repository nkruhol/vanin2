import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const participantsState = (store: IStore) => store.participants;

export const selectParticipants = createSelector(
  participantsState,
  i => i.participants,
);

export const selectState = createSelector(
  participantsState,
  i => i.state,
);
