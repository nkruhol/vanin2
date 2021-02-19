import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ExtendStateAction, LoginAction, LogoutAction } from "src/app/storage/app/app.actions";
import { selectIsUserLogged, selectLanguage } from "src/app/storage/app/app.selectors";
import { LanguageEnum } from "src/app/storage/app/app.state";
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  language$ = this.store.select(selectLanguage);
  isUserLogged$ = this.store.select(selectIsUserLogged);

  constructor(
    private store: Store<IStore>
  ) { }

  LanguageEnum = LanguageEnum;

  changeLanguage(language: LanguageEnum) {

    this.store.dispatch(ExtendStateAction({ newState: { language }}));
  }

  logout() {

    this.store.dispatch(LogoutAction());
  }

  login() {

    this.store.dispatch(LoginAction());
  }
}
