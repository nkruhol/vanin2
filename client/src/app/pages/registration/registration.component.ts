import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { selectLanguage } from "src/app/storage/app/app.selectors";
import { LanguageEnum } from "src/app/storage/app/app.state";
import { CreateParticipantAction, ExtendStateAction } from "src/app/storage/registration/registration.actions";
import { selectState } from "src/app/storage/registration/registration.selectors";
import { State } from "src/app/storage/registration/registration.state";
import { IStore } from "src/app/storage/store";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {

  state$ = this.store.select(selectState);

  sections$ = this.store.select(selectLanguage).pipe(
    map(language => this.sectionsMap[language]),
  );

  constructor(
    private fb: FormBuilder,
    private store: Store<IStore>,
  ) { }

  State = State;

  notRobot: boolean = !environment.isRecapthaUsed;
  recaptchaKey: string = environment.recaptchaKey;
  showRecapthca = environment.isRecapthaUsed;

  registrationForm = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.pattern("\\d{0,12}")]],
    articleName: [null, [Validators.required]],
    organization: [null, [Validators.required]],
    coAuthors: [null, [Validators.required]],
    description: [null, [Validators.required]],
    section: [null, [Validators.required]],
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

  private sectionsMap = {
    [LanguageEnum.EN]: [
      "Boundary-value problems of mathematical physics; a numerical solving by the DSM",
      "Integral equations and their applications. The discrete singularities methods.",
      "The discrete vortex method in aerohydrodynamic",
      "The discrete singularities methods in electrodynamics and electronics",
      "Spectral problems of the theory of oscillations and waves; a numerical solving by the DSM",
      "Mathematical modeling based on the DSM and numerical methods",
      "Computer modeling and numerical experiments at the basis of DSM and their information and software support (parallelism, software libraries, testing).",
      "Theory dynamical systems",
      "Control theory and problems of stability of systems.",
      "Math modeling.",
      "Numerical methods and computational technologies",
      "Methods of discrete singularities and their applications.",
      "Information and computer technologies.",
      "Computer modeling and special software.",
      "Simulation - laboratory and physical experiment",
    ],
    [LanguageEnum.RU]: [
      "Задачи и методы математической физики.",
      "Интегральные уравнения и их приложения.",
      "Вычислительная аэрогидродинамика. Аэродинамика летательных аппаратов.",
      "Экспериментальная аэрогидродинамика.",
      "Методы и задачи теории фильтрации.",
      "Теория упругости и задачи прочности конструкций.",
      "Теория динамики систем.",
      "Теория управления и проблемы устойчивости систем.",
      "Математическое моделирование.",
      "Численные методы и вычислительные технологии.",
      "Методы дискретных особенностей и их приложения.",
      "Информационные и компьютерные технологии.",
      "Компьютерное моделирование и специальные программные средства.",
      "Моделирование- лабораторный и физический эксперимент.",
    ],
    [LanguageEnum.UA]: [
      "Задачі і методи математичної фізики.",
      "Інтегральні рівняння та їх застосування.",
      "Обчислювальна аерогідродинаміка. Аеродинаміка літаючих апаратів.",
      "Експериментальна аерогідродинаміка.",
      "Методи і задачі в теорії фільтрації.",
      "Теорія пружності та задачі міцності конструкцій.",
      "Теорія динаміки систем.",
      "Теорія управління та проблеми стійкості систем.",
      "Математичне моделювання.",
      "Чисельні методи та обчислювальні технології.",
      "Методи дискретних особливостей та їх застосування.",
      "Інформаційні та комп’ютерні технології.",
      "Комп’ютерне моделювання і спеціальні програмні засоби.",
      "Моделювання- лабораторний та фізичний експеримент.",
    ],
  }
}
