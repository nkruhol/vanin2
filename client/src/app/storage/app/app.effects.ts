import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction } from "@ngrx/store";
import { from } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { LoginModalComponent } from "src/app/shared/login-modal/login-modal.component";
import { LoginAction, LogoutAction } from "./app.actions";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {}

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
  })
}
