import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./services/auth.service";
import { IStore } from './storage/store';
import { Store } from '@ngrx/store';
import { InitAppAction } from './storage/app/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vanin';

  constructor(
    private store: Store<IStore>,
  ) {}

  ngOnInit() {

    this.store.dispatch(InitAppAction());
  }
}
