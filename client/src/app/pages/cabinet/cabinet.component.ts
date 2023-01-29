import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/roles.service';
import { Roles } from 'src/app/storage/administration/administration.state';
import { selectUserInfo } from 'src/app/storage/app/app.selectors';
import { AddNewArticleAction, InitConferenceDetailsAction, UpdateUserInfoAction } from 'src/app/storage/cabinet/cabinet.actions';
import { articles, conferenceDetailsState, currentArticle } from 'src/app/storage/cabinet/cabinet.selectors';
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  user$ = this.store.select(selectUserInfo);
  userInfoState$ = this.store.select(selectUserInfo);
  conferenceDetailsState$ = this.store.select(conferenceDetailsState);
  articles$ = this.store.select(articles);
  currentArticle$ = this.store.select(currentArticle); 

  constructor(
    private store: Store<IStore>,
    public roleService: RoleService,
  ) {}

  active: string = "conferenceDetails";
  Roles = Roles;

  ngOnInit() {

    // this.store.dispatch(InitAdministrationAction({ tab: this.active }));
  }

  updateUserInfo(user) {

    this.store.dispatch(UpdateUserInfoAction({ user }));
  }

  addNewArticle(user) {

    this.store.dispatch(AddNewArticleAction({ user }));
  }

  conferenceDetailsInit() {

    this.store.dispatch(InitConferenceDetailsAction());
  }
}
