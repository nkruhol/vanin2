import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concat, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IParticipant } from "../particaipants/participants.state";
import * as ArchiveActions from "./archive.actions";
import { State } from "./archive.state";

export interface IFaunaDbEntity<T> {
  data: T[];
}

@Injectable()
export class ArchiveEffect {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ArchiveActions.InitArchiveAction),
    switchMap((action) => {

      const participants$ = this.http.get(environment.api + "/participants" + "/" + action.year).pipe(
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
    map(newState => ArchiveActions.ExtendStateAction({ newState })),
  ));

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(ArchiveActions.GetArticleAction),
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
    map(newState => ArchiveActions.ExtendStateAction({ newState })),
  ));
}
