import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/roles.service';
import { InitAdministrationAction, InitPagesEditAction, InitUsersAction, UpdatePagesEditAction, UpdateSiteViewOptionsAction, UpdateUserAction } from 'src/app/storage/administration/administration.actions';
import { selectLayout, selectPages, selectState, selectUsers } from 'src/app/storage/administration/administration.selectors';
import { Roles } from 'src/app/storage/administration/administration.state';
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'administration-rules',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  state$ = this.store.select(selectState);
  layout$ = this.store.select(selectLayout);
  pages$ = this.store.select(selectPages);
  users$ = this.store.select(selectUsers);

  constructor(
    private fb: FormBuilder,
    private store: Store<IStore>,
    public roleService: RoleService,
  ) {}

  active: string;
  Roles = Roles;

  siteViewForm = this.fb.group({
    history: [null],
    registration: [null],
    participants_list: [null],
    letters: [null],
    article_rules: [null],
    archive: [null],
    contacts: [null],
  });

  ngOnInit() {

    this.store.dispatch(InitAdministrationAction({ tab: this.active }));

    this.layout$.pipe(
      filter(i => !!i),
    )
      .subscribe(res => {

        console.log('result = ', res);
        this.siteViewForm.patchValue(res);
      })
  }

  update() {

    const formData = this.siteViewForm.value;
    this.store.dispatch(UpdateSiteViewOptionsAction({ data: formData }));
  }

  initEditPages() {

    this.store.dispatch(InitPagesEditAction());
  }

  updatePages(pages) {

    this.store.dispatch(UpdatePagesEditAction({ pages }));
  }

  initUsers() {

    this.store.dispatch(InitUsersAction());
  }

  updateUser(user) {

    this.store.dispatch(UpdateUserAction({ user }));
  }
}
