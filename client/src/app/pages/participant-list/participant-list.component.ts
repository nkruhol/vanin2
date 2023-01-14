import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectIsUserLogged } from "src/app/storage/app/app.selectors";
import { ApproveParticipantAction, GetArticleAction, InitParticipantsListAction } from "src/app/storage/particaipants/participants.actions";
import { selectApprovingId, selectParticipants, selectState } from "src/app/storage/particaipants/participants.selectors";
import { IParticipant, State } from "src/app/storage/particaipants/participants.state";
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  participants$ = this.store.select(selectParticipants);
  state$ = this.store.select(selectState);
  approvingId$ = this.store.select(selectApprovingId);
  isUserLogged$ = this.store.select(selectIsUserLogged);

  constructor(
    private store: Store<IStore>,
  ) { }

  State = State;

  ngOnInit() {

    this.store.dispatch(InitParticipantsListAction());
  }

  approveParticipant(participant: IParticipant) {

    this.store.dispatch(ApproveParticipantAction({ participant }));
  }

  openArticle(participant: IParticipant) {

    this.store.dispatch(GetArticleAction({ participant }));
  }

}
