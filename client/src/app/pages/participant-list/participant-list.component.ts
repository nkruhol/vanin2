import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApproveParticipantAction, InitParticipantsListAction } from "src/app/storage/particaipants/participants.actions";
import { selectParticipants, selectState } from "src/app/storage/particaipants/participants.selectors";
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

  constructor(
    private store: Store<IStore>,
  ) { }

  State = State;
  ngOnInit() {

    this.store.dispatch(InitParticipantsListAction());
  }

  approveParticipant(participant: IParticipant) {

    this.store.dispatch(ApproveParticipantAction({ participant: { ...participant, isApproved: true } }))
  }

}
