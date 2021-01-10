import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { tap, map } from "rxjs/operators";
import { NavigateAction, GoBackAction, GoForwardAction } from "./router.actions";

@Injectable()
export class RouterEffects {

    constructor(
        private actions: Actions,
        private router: Router,
        private location: Location
    ) {}

    @Effect({ dispatch: false })
    navigate = this.actions.pipe(
        ofType(NavigateAction),
        map(action => action.payload),
        tap(routeInfo => {

            const { path, query, extras } = routeInfo;
            this.router.navigate(path, { queryParams: query, ...extras });
        }),
    );

    @Effect({ dispatch: false })
    navigateBack = this.actions.pipe(
        ofType(GoBackAction),
        tap(() => { this.location.back(); }),
    );

    @Effect({ dispatch: false })
    navigateForward = this.actions.pipe(
        ofType(GoForwardAction),
        tap(() => { this.location.forward(); }),
    );
}
