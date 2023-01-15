import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concat, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ToastSeverity } from "src/app/shared/toasts/toast";
import { ToastsService } from "src/app/shared/toasts/toasts.service";
import { environment } from "src/environments/environment";
import * as AdministrationActions from "./administration.actions";
import { State } from "./administration.state";

@Injectable()
export class AdministrationEffect {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toast: ToastsService,
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AdministrationActions.InitAdministrationAction),
    switchMap((action) => {

      const participants$ = this.http.get(environment.api + "/getSiteOptionsLayout").pipe(
        map((res: any) => {

          return {
            state: State.DATA,
            layout: res.data,
          };
        })
      );

      return concat(
        of({ state: State.LOADING }),
        participants$,
      )
    }),
    map(newState => AdministrationActions.ExtendStateAction({ newState })),
  ));

  create$ = createEffect(() => this.actions$.pipe(

    ofType(AdministrationActions.UpdateSiteViewOptionsAction),
    switchMap(({ data }) => {

      const update$ = this.http.post(environment.api + "/updateSiteOptionsLayout", data).pipe(
        map(res => {

          this.toast.showToast({
            text: "Update Successful!",
            severity: ToastSeverity.SUCCESS,
          });

          return {
            state: State.DATA,
            layout: data,
          };
        }),
        // catchError(err => {

        //   this.toast.showToast({
        //     text: err.message,
        //     severity: ToastSeverity.DANGER,
        //   });

        //   return of({ state: State.DATA });
        // }),
      );

      return concat(
        of({ state: State.LOADING }),
        update$,
      )
    }),
    map(newState => AdministrationActions.ExtendStateAction({ newState })),
  ))

  // getArticle$ = createEffect(() => this.actions$.pipe(
  //   ofType(AdministrationActions.GetArticleAction),
  //   switchMap((action) => {
    
  //     const getArticle$ = this.http.post(environment.api + "/getArticle", action.participant).pipe(
  //       map((res: any) => {

  //         console.log('res / ', res);
  //         window.open(res.url, '_blank');
  //         return {
  //           state: State.DATA,
  //         };
  //       })
  //     );

  //     return concat(
  //       of({ state: State.LOADING }),
  //       getArticle$,
  //     )
  //   }),
  //   map(newState => AdministrationActions.ExtendStateAction({ newState })),
  // ));
}
