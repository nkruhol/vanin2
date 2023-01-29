import { routerReducer } from "@ngrx/router-store";
import { Action, ActionReducer, RootStoreConfig } from "@ngrx/store";
import { AddArticleReducer } from "./add-article/add-article.reducer";
import { AdministrationReducer } from "./administration/administration.reducer";
import { ApplicationReducer } from "./app/app.reducer";
import { ArchiveReducer } from "./archive/archive.reducer";
import { CabinetReducer } from "./cabinet/cabinet.reducer";
import { ParticipantsReducer } from "./particaipants/participants.reducer";
import { RegistrationReducer } from "./registration/registration.reducer";
import { IStore } from "./store";

export const ReducerMap: { [key in keyof IStore]: (state: any, action: any) => any } = {
  router: routerReducer,
  app: ApplicationReducer,
  participants: ParticipantsReducer,
  registration: RegistrationReducer,
  addArticle: AddArticleReducer,
  archive: ArchiveReducer,
  administration: AdministrationReducer,
  cabinet: CabinetReducer,
}

export const ReducerConfiguration: RootStoreConfig<IStore> = {
  metaReducers: [ClearState],
  runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionSerializability: false,
      strictStateSerializability: false,
  }
};

export function ClearState(reducer: ActionReducer<IStore>) {

  return (state: IStore, action: Action): IStore => {

      return reducer(state, action);
  };
}
