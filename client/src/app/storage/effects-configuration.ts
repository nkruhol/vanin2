import { AddArticleEffect } from "./add-article/add-article.effects";
import { AdministrationEffect } from "./administration/administration.effects";
import { AppEffects } from "./app/app.effects";
import { ArchiveEffect } from "./archive/archive.effects";
import { ParticipantsEffect } from "./particaipants/participants.effects";
import { RegistrationEffect } from "./registration/registration.effects";

export const EffectsConfiguration = [
  AppEffects,
  ParticipantsEffect,
  RegistrationEffect,
  AddArticleEffect,
  ArchiveEffect,
  AdministrationEffect,
];
