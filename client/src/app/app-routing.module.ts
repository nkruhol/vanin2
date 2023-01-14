import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from "./pages/add-article/add-article.component";
import { ArchiveComponent } from './pages/archive/archive.component';
import { ArticleRulesComponent } from "./pages/article-rules/article-rules.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { HistoryComponent } from "./pages/history/history.component";
import { HomeComponent } from "./pages/home/home.component";
import { LettersComponent } from "./pages/letters/letters.component";
import { ParticipantListComponent } from "./pages/participant-list/participant-list.component";
import { RegistrationComponent } from "./pages/registration/registration.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "add-article",
    component: AddArticleComponent,
  },
  {
    path: "participants",
    component: ParticipantListComponent,
  },
  {
    path: "history",
    component: HistoryComponent,
  },
  {
    path: "letters",
    component: LettersComponent,
  },
  {
    path: "contacts",
    component: ContactsComponent,
  },
  {
    path: "rules",
    component: ArticleRulesComponent,
  },
  {
    path: "dsmmph/:year",
    component: ArchiveComponent,
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
