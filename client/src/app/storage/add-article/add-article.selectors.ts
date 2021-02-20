import { createSelector } from "@ngrx/store";
import { IStore } from "../store";

export const addArticleState = (store: IStore) => store.addArticle;

export const selectState = createSelector(
  addArticleState,
  i => i.state,
);
