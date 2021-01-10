import { createAction, props } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

export const NavigateAction = createAction(
    "[Router] Navigate",
    props<{
        payload: {
            path: any[];
            query?: object;
            extras?: NavigationExtras;
        }
    }>()
);

export const GoBackAction = createAction(
    "[Router] Go back",
);

export const GoForwardAction = createAction(
    "[Router] Go forward",
);
