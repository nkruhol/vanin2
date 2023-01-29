import { createReducer, on, Action } from "@ngrx/store";
import { CabinetState } from "./cabinet.state";
import * as Actions from "./cabinet.actions";

const _cabinetReducer = createReducer(
    new CabinetState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function CabinetReducer(state: CabinetState, action: Action) {

    return _cabinetReducer(state, action);
}
