import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const archiveState = (store: IStore) => store.archive;

export const selectParticipants = createSelector(
  archiveState,
  i => i.participants,
);

export const selectState = createSelector(
  archiveState,
  i => i.state,
);
