import { createAction, props } from "@ngrx/store";
import { AdministrationState, ILayout } from "./administration.state";

export const ExtendStateAction = createAction(
  "[Administration] Extend State",
  props<{ newState: Partial<AdministrationState> }>(),
);

export const InitAdministrationAction = createAction(
  "[Administration] Init Participants List",
  props<{ tab: string }>(),
);

export const UpdateSiteViewOptionsAction = createAction(
  "[Administration] Update Site View Options",
  props<{ data: ILayout }>(),
)