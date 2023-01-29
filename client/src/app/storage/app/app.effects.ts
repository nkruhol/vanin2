import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { concat, from } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { LoginModalComponent } from "src/app/shared/login-modal/login-modal.component";
import { RegistrationModalComponent } from "src/app/shared/registration-modal/registration-modal.component";
import { ToastSeverity } from "src/app/shared/toasts/toast";
import { ToastsService } from "src/app/shared/toasts/toasts.service";
import { environment } from "src/environments/environment";
import { ChangeLanguageAction, ExtendStateAction, InitAppAction, LoginAction, LogoutAction, RegistrationAction } from "./app.actions";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private modalService: NgbModal,
    private authService: AuthService,
    private translate: TranslateService,
    private http: HttpClient,
    private toast: ToastsService,
  ) {}

  init$ = createEffect(() => this.actions$.pipe(

    ofType(InitAppAction),
    switchMap(() => {

      const user = this.authService.getUser();

      const queryPaerams = user
        ? "?uid=" + user.uid
        : "";

      const participants$ = this.http.get(environment.api + "/getSiteOptions" + queryPaerams).pipe(
        map((res: any) => {

          return {
            // state: State.DATA,
            siteOptions: res.data,
            user: res.user,
          };
        })
      );

      return concat(
        // of({ state: State.LOADING }),
        participants$,
      )
    }),
    map(newState => ExtendStateAction({ newState })),
  ))

  login$ = createEffect(() => this.actions$.pipe(

    ofType(LoginAction),
    switchMap(() => {

      const modalRef = this.modalService.open(LoginModalComponent, {
        size: "lg",
      });

      return modalRef.result;
    }),
    filter(i => !!i),
    switchMap(res => from(this.authService.SignIn(res.email, res.password))),
  ), {
    dispatch: false,
  });

  logout$ = createEffect(() => this.actions$.pipe(

    ofType(LogoutAction),
    switchMap(() => this.authService.SignOut()),
  ), {
    dispatch: false,
  });

  changeLanguage$ = createEffect(() => this.actions$.pipe(

    ofType(ChangeLanguageAction),
    map(({ language }) => {

      this.translate.use(language);

      return ExtendStateAction({ newState: { language }})
    })
  ));

  registration$ = createEffect(() => this.actions$.pipe(

    ofType(RegistrationAction),
    switchMap(() => {

      const modalRef = this.modalService.open(RegistrationModalComponent, {
        size: "lg",
      });

      return modalRef.result;
    }),
    filter(i => !!i),
    switchMap(res => from(this.authService.SignUp(res.email, res.password))),
    tap(() => {
      this.toast.showToast({
        text: "New User is created",
        severity: ToastSeverity.SUCCESS,
      });
    })
  ), {
    dispatch: false,
  });
}
