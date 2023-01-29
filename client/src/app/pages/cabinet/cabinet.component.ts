import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/roles.service';
import { Roles } from 'src/app/storage/administration/administration.state';
import { selectUserInfo } from 'src/app/storage/app/app.selectors';
import { UpdateUserInfoAction } from 'src/app/storage/cabinet/cabinet.actions';
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  // state$ = this.store.select(selectState);
  // layout$ = this.store.select(selectLayout);
  // pages$ = this.store.select(selectPages);
  user$ = this.store.select(selectUserInfo);
  userInfoState$ = this.store.select(selectUserInfo);

  constructor(
    private store: Store<IStore>,
    public roleService: RoleService,
  ) {}

  active: string = "userInfo";
  Roles = Roles;

  ngOnInit() {

    // this.store.dispatch(InitAdministrationAction({ tab: this.active }));
  }

  updateUserInfo(user) {
console.log(777, user)
    this.store.dispatch(UpdateUserInfoAction({ user }));
  }
}
