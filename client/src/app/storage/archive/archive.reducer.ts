import { createReducer, on, Action } from "@ngrx/store";
import { ArchiveState } from "./archive.state";
import * as Actions from "./archive.actions";

const _archiveReducer = createReducer(
    new ArchiveState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function ArchiveReducer(state: ArchiveState, action: Action) {

    return _archiveReducer(state, action);
}
