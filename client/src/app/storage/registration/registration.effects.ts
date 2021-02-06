import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concat, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ToastSeverity } from "src/app/shared/toasts/toast";
import { ToastsService } from "src/app/shared/toasts/toasts.service";
import { IStore } from "../store";
import { CreateParticipantAction, ExtendStateAction } from "./registration.actions";
import { State } from "./registration.state";

export interface IFaunaDbEntity<T> {
  data: T;
  ref: {
    "@ref": {
      id: number;
    }
  }
}

@Injectable()
export class RegistrationEffect {

  constructor(
    private store: Store<IStore>,
    private actions$: Actions,
    private http: HttpClient,
    private toast: ToastsService,
  ) {}

  create$ = createEffect(() => this.actions$.pipe(

    ofType(CreateParticipantAction),
    switchMap(({ form }) => {

      const registration$ = this.http.post("http://localhost:5001/vanin2/us-central1/createParticipant", form).pipe(
        map(res => {

          this.toast.showToast({
            text: "Регистрация успешна!",
            severity: ToastSeverity.SUCCESS,
          });

          return { state: State.SAVED };
        }),
        catchError(err => {

          this.toast.showToast({
            text: err.message,
            severity: ToastSeverity.DANGER,
          });

          return of({ state: State.ERROR });
        }),
      );

      return concat(
        of({ state: State.SAVING }),
        registration$,
      )
    }),
    map(newState => ExtendStateAction({ newState })),
  ))
}
