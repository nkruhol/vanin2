import { AddArticleEffect } from "./add-article/add-article.effects";
import { AppEffects } from "./app/app.effects";
import { ParticipantsEffect } from "./particaipants/participants.effects";
import { RegistrationEffect } from "./registration/registration.effects";

export const EffectsConfiguration = [
  AppEffects,
  ParticipantsEffect,
  RegistrationEffect,
  AddArticleEffect,
];
