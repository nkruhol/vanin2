import { createReducer, on, Action } from "@ngrx/store";
import { RegistrationState } from "./registration.state";
import * as Actions from "./registration.actions";

const _registrationReducer = createReducer(
    new RegistrationState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function RegistrationReducer(state: RegistrationState, action: Action) {

    return _registrationReducer(state, action);
}
