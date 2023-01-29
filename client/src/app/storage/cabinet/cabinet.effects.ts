import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concat, of } from "rxjs";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { NewArticleModalComponent } from "src/app/shared/new-article-modal/new-article-modal.component";
import { ToastSeverity } from "src/app/shared/toasts/toast";
import { ToastsService } from "src/app/shared/toasts/toasts.service";
import { environment } from "src/environments/environment";
import { selectUserInfo } from "../app/app.selectors";
import { IStore } from "../store";
import * as CabinetActions from "./cabinet.actions";
import { State } from "./cabinet.state";

@Injectable()
export class CabinetEffect {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toast: ToastsService,
    private modalService: NgbModal,
    private store: Store<IStore>,
  ) {}

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(CabinetActions.UpdateUserInfoAction),
    switchMap((action) => {

      const updating$ = this.http.post(environment.api + "/updateUser", action.user).pipe(
        map((res: any) => {

          return {
            userInfoState: State.DATA,
          };
        })
      );

      return concat(
        of({ userInfoState: State.UPDATING }),
        updating$
      );
    }),
    map(newState => CabinetActions.ExtendStateAction({ newState })),
  ));

  initConferenceDetails$ = createEffect(() => this.actions$.pipe(
    ofType(CabinetActions.InitConferenceDetailsAction),
    withLatestFrom(this.store.select(selectUserInfo)),
    switchMap(([action, userInfo]) => {

      const qp = "?userId=" + userInfo.id + "&year=2023";
      const articles$ = this.http.get(environment.api + "/participantsByUserId" + qp).pipe(
        map((res: any) => {

          return {
            conferenceDetailsState: State.DATA,
            articles: res.data,
          }
        })
      );

      return concat(
        of({ conferenceDetailsState: State.LOADING }),
        articles$,
      );
    }),
    map(newState => CabinetActions.ExtendStateAction({ newState })),
  ))

  addNewArticle$ = createEffect(() => this.actions$.pipe(
    ofType(CabinetActions.AddNewArticleAction),
    switchMap(action => {

      const modalRef = this.modalService.open(NewArticleModalComponent, {
        size: "lg",
      });

      modalRef.componentInstance.user = action.user;

      return modalRef.result;
    }),
    filter(i => !!i),
    switchMap(res => {

      console.log(res);
      const create$ = this.http.post(environment.api + "/createParticipant/2023", res).pipe(
        map((res: any) => {

          this.toast.showToast({
            text: "Регистрация успешна!",
            severity: ToastSeverity.SUCCESS,
          });

          return {
            conferenceDetailsState: State.DATA,
            articles: res.data,
            currentArticle: res.data.filter(i => i.id == res.createdArticleId)[0],
          };
        }),
      );

      return concat(
        of({ conferenceDetailsState: State.CREATING }),
        create$,    
      )
    }),
    map(newState => CabinetActions.ExtendStateAction({ newState })),
  ))
}
