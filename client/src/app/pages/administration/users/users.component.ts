import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { InitAdministrationAction, UpdateSiteViewOptionsAction } from 'src/app/storage/administration/administration.actions';
import { selectLayout, selectState } from 'src/app/storage/administration/administration.selectors';
import { IPages, IUser, Roles } from 'src/app/storage/administration/administration.state';
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {

  @Input() users: IUser[];
  @Output() init = new EventEmitter();
  @Output() updateUser = new EventEmitter<IUser>()

  Roles = Roles;

  constructor() {}

  ngOnInit() {

    this.init.emit();
  }

  ngOnChanges() {

    if (!this.users) {

      
    }
  }

  initRole(role: Roles, user: IUser) {

    return (user.role & role) === role;
  }

  updateRole(value: boolean, role: Roles, user: IUser) {

    const role2 = [
      Roles.SuperAdmin,
      Roles.Admin,
      Roles.Reviewer,
      Roles.User,
    ].map(i => (i == role) ? +value : +this.initRole(i, user))
      .reverse()
      .join('');

    this.updateUser.emit({
      ...user,
      role: parseInt(role2, 2) 
    });
  }
}
