import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const cabinetState = (store: IStore) => store.cabinet;

export const userInfoState = createSelector(
  cabinetState,
  i => i.userInfoState,
);
