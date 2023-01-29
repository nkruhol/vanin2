import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { IUserInfo } from "src/app/storage/app/app.state";
import { IArticle, State } from 'src/app/storage/cabinet/cabinet.state';

@Component({
  selector: 'user-participant',
  templateUrl: './user-participant.component.html',
  styleUrls: ['./user-participant.component.scss']
})
export class UserParticipantComponent implements OnInit {

  @Input() user: IUserInfo;
  @Input() state: State;
  @Input() articles: IArticle[];
  @Input() currentArticle: IArticle;
  @Output() init = new EventEmitter();
  @Output() add = new EventEmitter<IUserInfo>();

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

    this.init.emit();
    // this.userInfoForm.patchValue(this.user)
  }

  addArticle() {

    this.add.emit(this.user);
  }

  // updateUserInfo() {

  //   this.update.emit({ ...this.user, ...this.userInfoForm.value });
  // }
}
