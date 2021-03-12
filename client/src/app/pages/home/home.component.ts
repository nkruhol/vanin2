import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectLanguage } from "src/app/storage/app/app.selectors";
import { LanguageEnum } from "src/app/storage/app/app.state";
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  language$ = this.store.select(selectLanguage);

  constructor(
    private store: Store<IStore>,
  ) { }

  LanguageEnum = LanguageEnum;

  ngOnInit(): void {
  }

}
