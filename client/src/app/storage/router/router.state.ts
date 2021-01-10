import {
    RouterReducerState,
    RouterNavigationAction as NgRxRouterNavigationAction,
} from "@ngrx/router-store";
import { Params } from "@angular/router";

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
    routerPathSegments: string[];
    routerPath: string;
}

export type RouterState = RouterReducerState<RouterStateUrl>;

export type RouterNavigationAction = NgRxRouterNavigationAction<RouterStateUrl>;
