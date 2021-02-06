import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concat, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { IStore } from "../store";
import { ExtendStateAction, InitParticipantsListAction } from "./participants.actions";
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
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(InitParticipantsListAction),
    switchMap(() => {

      const participants$ = this.http.get("http://localhost:5001/vanin2/us-central1/participants").pipe(
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
}
