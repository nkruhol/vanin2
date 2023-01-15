import { createAction, props } from "@ngrx/store";
import { AdministrationState, ILayout, IPages } from "./administration.state";

export const ExtendStateAction = createAction(
  "[Administration] Extend State",
  props<{ newState: Partial<AdministrationState> }>(),
);

export const InitAdministrationAction = createAction(
  "[Administration] Init Administration",
  props<{ tab: string }>(),
);

export const UpdateSiteViewOptionsAction = createAction(
  "[Administration] Update Site View Options",
  props<{ data: ILayout }>(),
)

export const InitPagesEditAction = createAction(
  "[Administration] Init Pages Edit",
);

export const UpdatePagesEditAction = createAction(
  "[Administration] Update Pages Edit",
  props<{ pages: IPages }>(),
);

export const InitUsersAction = createAction(
  "[Administration] Init Users",
);