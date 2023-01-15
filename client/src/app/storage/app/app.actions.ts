import { createAction, props } from "@ngrx/store"
import { AppState, LanguageEnum } from "./app.state";

export const ExtendStateAction = createAction(
  "[App] Extend State",
  props<{ newState: Partial<AppState> }>(),
);

export const InitAppAction = createAction(
  "[App] Init App",
);

export const ChangeLanguageAction = createAction(
  "[App] Change Language",
  props<{ language: LanguageEnum }>(),
);

export const LoginAction = createAction(
  "[App] Login"
);

export const LogoutAction = createAction(
  "[App] Logout"
);

export const RegistrationAction = createAction(
  "[App] Registration"
);