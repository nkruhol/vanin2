import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const cabinetState = (store: IStore) => store.cabinet;

export const userInfoState = createSelector(
  cabinetState,
  i => i.userInfoState,
);

export const articles = createSelector(
  cabinetState,
  i => i.articles,
);

export const conferenceDetailsState = createSelector(
  cabinetState,
  i => i.conferenceDetailsState,
);

export const currentArticle = createSelector(
  cabinetState,
  i => i.currentArticle,
);
