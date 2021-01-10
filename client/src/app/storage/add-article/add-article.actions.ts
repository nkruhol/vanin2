import { createEffect } from "@ngrx/effects";
import { createAction, props } from "@ngrx/store";
import { AddArticleState } from "./add-article.state";

export const ExtendStateAction = createAction(
  "[AddArticle] Extend State",
  props<{ newState: Partial<AddArticleState> }>(),
);

export const GetParticipantsByEmail = createAction(
  "[AddArticle] Get Participants By Email",
  props<{ email: string }>(),
);
