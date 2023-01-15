import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const administrationState = (store: IStore) => store.administration;

export const selectLayout = createSelector(
  administrationState,
  i => i.layout,
);

export const selectPages = createSelector(
  administrationState,
  i => i.pages,
);

export const selectState = createSelector(
  administrationState,
  i => i.state,
);
