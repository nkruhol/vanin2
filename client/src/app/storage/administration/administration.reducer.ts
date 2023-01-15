import { createReducer, on, Action } from "@ngrx/store";
import { AdministrationState } from "./administration.state";
import * as Actions from "./administration.actions";

const _administrationReducer = createReducer(
    new AdministrationState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function AdministrationReducer(state: AdministrationState, action: Action) {

    return _administrationReducer(state, action);
}
