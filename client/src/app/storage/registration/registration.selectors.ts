import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const registrationState = (store: IStore) => store.registration;

export const selectState = createSelector(
  registrationState,
  i => i.state,
);
