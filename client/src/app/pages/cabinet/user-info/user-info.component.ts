import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { IUserInfo } from "src/app/storage/app/app.state";
import { State } from 'src/app/storage/cabinet/cabinet.state';
@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user: IUserInfo;
  @Input() state: State;
  @Output() update = new EventEmitter<IUserInfo>();

  State = State;

  constructor(
    private fb: FormBuilder,
  ) { }

  userInfoForm = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.pattern("\\d{0,12}")]],
    organization: [null],
    googleAcademy: [null],
    orcid: [null],
  });

  ngOnInit() {

    this.userInfoForm.patchValue(this.user)
  }

  updateUserInfo() {

    this.update.emit({ ...this.user, ...this.userInfoForm.value });
  }
}
