import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concat, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { ToastSeverity } from "src/app/shared/toasts/toast";
import { ToastsService } from "src/app/shared/toasts/toasts.service";
import { environment } from "src/environments/environment";
import { IStore } from "../store";
import { ApproveParticipantAction, ExtendStateAction, GetArticleAction, InitParticipantsListAction } from "./participants.actions";
import { selectParticipants } from "./participants.selectors";
import { IParticipant, State } from "./participants.state";

export interface IFaunaDbEntity<T> {
  data: T[];
}

@Injectable()
export class ParticipantsEffect {

  constructor(
    private store: Store<IStore>,
    private actions$: Actions,
    private http: HttpClient,
    private toast: ToastsService,
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(InitParticipantsListAction),
    switchMap(() => {

      const participants$ = this.http.get(environment.api + "/participants/2023").pipe(
        map((res: IFaunaDbEntity<IParticipant>) => {

          return {
            state: State.DATA,
            participants: res.data,
          };
        })
      );

      return concat(
        of({ state: State.LOADING }),
        participants$,
      )
    }),
    map(newState => ExtendStateAction({ newState })),
  ));

  approve$ = createEffect(() => this.actions$.pipe(
    ofType(ApproveParticipantAction),
    withLatestFrom(this.store.select(selectParticipants)),
    switchMap(([action, participants]) => {

        const approve$ = this.http.post(environment.api + "/approveParticipant", action.participant).pipe(
          map(() => {

            this.toast.showToast({
              text: "Регистрация подтверждена. Письмо на электронную почту участника отправлено!",
              severity: ToastSeverity.SUCCESS,
            });

            return ExtendStateAction({ newState: {
              participants: (participants || []).map(i => ({ ...i, isApproved: i.id == action.participant.id ? true : i.isApproved })),
              approvingId: null,
            }});
          }),
          catchError(err => {

            this.toast.showToast({
              text: err.error?.err?.message ?? "Internal Server Error",
              severity: ToastSeverity.DANGER,
            });

            return of(ExtendStateAction({ newState: { approvingId: null }}));
          }),
        );

        return concat(
          of(ExtendStateAction({ newState: { approvingId: action.participant.id }})),
          approve$,
        );
    }),
  ))

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(GetArticleAction),
    switchMap((action) => {
    
      const getArticle$ = this.http.post(environment.api + "/getArticle", action.participant).pipe(
        map((res: any) => {

          console.log('res / ', res);
          window.open(res.url, '_blank');
          return {
            state: State.DATA,
          };
        })
      );

      return concat(
        of({ state: State.LOADING }),
        getArticle$,
      )
    }),
    map(newState => ExtendStateAction({ newState })),
  ));
}
