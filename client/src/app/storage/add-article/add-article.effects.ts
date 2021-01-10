import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concat, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ToastSeverity } from "src/app/shared/toasts/toast";
import { ToastsService } from "src/app/shared/toasts/toasts.service";
import { IParticipant } from "../particaipants/participants.state";
import { IStore } from "../store";
import { ExtendStateAction, GetParticipantsByEmail } from "./add-article.actions";
import { State } from "./add-article.state";

export interface IFaunaDbEntity<T> {
  data: T;
  ref: {
    "@ref": {
      id: number;
    }
  }
}

@Injectable()
export class AddArticleEffect {

  constructor(
    private store: Store<IStore>,
    private actions$: Actions,
    private http: HttpClient,
    private toast: ToastsService,
  ) {}

  getParticipantsByEmail$ = createEffect(() => this.actions$.pipe(

    ofType(GetParticipantsByEmail),
    switchMap(({ email }) => {

      const get$ = this.http.get(".netlify/functions/participants-by-email", {
        params: { email }
      }).pipe(
        map((res: IFaunaDbEntity<IParticipant>[]) => {

          console.log(res);
          const participants = (res || []).map(i => ({ ...i.data, id: i.ref["@ref"].id }));

          return {
            state: participants.length > 0 ? State.DATA : State.NO_DATA,
            participants,
          };
        }),
        catchError(err => {

          this.toast.showToast({
            text: err.message,
            severity: ToastSeverity.DANGER,
          });

          return of({ state: State.ERROR });
        }),
      )

      return concat(
        of({ state: State.LOADING }),
        get$,
      );
    }),
    map(newState => ExtendStateAction({ newState })),
  ))
}
