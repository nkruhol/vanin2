import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { CreateParticipantAction, ExtendStateAction } from "src/app/storage/registration/registration.actions";
import { selectState } from "src/app/storage/registration/registration.selectors";
import { State } from "src/app/storage/registration/registration.state";
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {

  state$ = this.store.select(selectState);

  constructor(
    private fb: FormBuilder,
    private store: Store<IStore>,
  ) { }

  State = State;

  notRobot: boolean;

  registrationForm = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.pattern("\\d{0,12}")]],
    articleName: [null, [Validators.required]],
    organization: [null, [Validators.required]],
    coAuthors: [null, [Validators.required]],
    description: [null, [Validators.required]],
  });

  ngOnDestroy() {

    this.store.dispatch(ExtendStateAction({ newState: { state: State.NONE }}));
  }

  registration() {

    this.store.dispatch(CreateParticipantAction({ form: this.registrationForm.value }));
  }

  resolved(e) {

    console.log(e);
    this.notRobot = true;
  }
}
