import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import { selectIsUserLogged } from "src/app/storage/app/app.selectors";
import * as ArchiveActions from 'src/app/storage/archive/archive.actions';
import * as Selectors from "src/app/storage/archive/archive.selectors";
import { IParticipant, State } from "src/app/storage/particaipants/participants.state";
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  participants$ = this.store.select(Selectors.selectParticipants);
  state$ = this.store.select(Selectors.selectState);
  isUserLogged$ = this.store.select(selectIsUserLogged);

  constructor(
    private store: Store<IStore>,
    private route: ActivatedRoute,
  ) { }

  State = State;

  ngOnInit() {

    this.route.params.subscribe(params => {

        this.store.dispatch(ArchiveActions.InitArchiveAction({ year: params['year'] }));
      });
  }

  openArticle(participant: IParticipant) {

    this.store.dispatch(ArchiveActions.GetArticleAction({ participant }));
  }

}
