import { Injectable } from "@angular/core";
import { routerReducer, RouterStateSerializer } from "@ngrx/router-store";
import { RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateUrl } from "./router.state";

export const RouterReducer = routerReducer;

@Injectable()
export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {

    serialize(routerState: RouterStateSnapshot): RouterStateUrl {

        let state: ActivatedRouteSnapshot = routerState.root;
        const routerPathSegments = [];

        while (state.firstChild) {

            state = state.firstChild;

            if (state.routeConfig) {

                routerPathSegments.push((state.routeConfig.path || "") as never);
            }
        }

        const { params } = state;
        const { url } = routerState;
        const { queryParams } = routerState.root;
        const routerPath = routerPathSegments.join("/");

        return {
            url,
            queryParams,
            params,
            routerPathSegments,
            routerPath,
        };
    }
}
