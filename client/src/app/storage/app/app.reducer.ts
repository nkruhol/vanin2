import { createReducer, on, Action } from "@ngrx/store";
import { AppState } from "./app.state";
import * as Actions from "./app.actions";

const _applicationReducer = createReducer(
    new AppState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function ApplicationReducer(state: AppState, action: Action) {

    return _applicationReducer(state, action);
}
