import { createAction, props } from "@ngrx/store";
import { IUserInfo } from "../app/app.state";
import { CabinetState } from "./cabinet.state";

export const ExtendStateAction = createAction(
  "[Cabinet] Extend State",
  props<{ newState: Partial<CabinetState> }>(),
);

export const UpdateUserInfoAction = createAction(
  "[Cabinet] Update User Info",
  props<{ user: IUserInfo }>(),
);

export const InitConferenceDetailsAction = createAction(
  "[Cabinet] Init Conference Details Action",
);

export const AddNewArticleAction = createAction(
  "[Cabinet] Ass New Article",
  props<{ user: IUserInfo }>(),
);