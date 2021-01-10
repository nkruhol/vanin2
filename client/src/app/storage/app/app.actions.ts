import { createAction, props } from "@ngrx/store"
import { AppState, LanguageEnum } from "./app.state";

export const ExtendStateAction = createAction(
  "[App] Extend State",
  props<{ newState: Partial<AppState> }>(),
);

export const ChangeLanguageAction = createAction(
  "[App] Change Language",
  props<{ language: LanguageEnum }>(),
)
