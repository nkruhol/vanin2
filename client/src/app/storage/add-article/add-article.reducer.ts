import { createReducer, on, Action } from "@ngrx/store";
import { AddArticleState } from "./add-article.state";
import * as Actions from "./add-article.actions";

const _addArticleReducer = createReducer(
    new AddArticleState,
    on(Actions.ExtendStateAction, (state, { newState }) => ({
        ...state,
        ...newState,
    })),
);

export function AddArticleReducer(state: AddArticleState, action: Action) {

    return _addArticleReducer(state, action);
}
