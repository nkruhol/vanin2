import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const appState = (store: IStore) => store.app;

export const selectLanguage = createSelector(
  appState,
  i => i.language,
);

export const selectIsUserLogged = createSelector(
  appState,
  i => i.isUserLogged,
);
