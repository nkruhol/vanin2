import { RouterState } from "@angular/router";
import { AddArticleState } from "./add-article/add-article.state";
import { AppState } from "./app/app.state";
import { ParticipantsState } from "./particaipants/participants.state";
import { RegistrationState } from "./registration/registration.state";

export interface IStore {
  router: RouterState,
  app: AppState,
  participants: ParticipantsState,
  registration: RegistrationState,
  addArticle: AddArticleState,
}
