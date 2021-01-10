import { createReducer, on, Action } from "@ngrx/store";
import { ParticipantsState } from "./participants.state";
import * as Actions from "./participants.actions";

const _participantsReducer = createReducer(
    new ParticipantsState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function ParticipantsReducer(state: ParticipantsState, action: Action) {

    return _participantsReducer(state, action);
}
