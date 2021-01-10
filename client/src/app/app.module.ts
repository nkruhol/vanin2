import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HeaderComponent } from './shared/header/header.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { StoreModule } from "@ngrx/store";
import { ReducerConfiguration, ReducerMap } from "./storage/reducer-configuration";
import { EffectsModule } from "@ngrx/effects";
import { EffectsConfiguration } from "./storage/effects-configuration";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { CustomRouterSerializer } from "./storage/router/router.reducers";
import { ReactiveFormsModule } from "@angular/forms";
import { ParticipantListComponent } from './pages/participant-list/participant-list.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { ToastsContainerComponent } from "./shared/toasts/toasts-container.component";
import { HistoryComponent } from './pages/history/history.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    HeaderComponent,
    LayoutComponent,
    ParticipantListComponent,
    AddArticleComponent,
    ToastsContainerComponent,
    HistoryComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    RecaptchaModule,
    StoreModule.forRoot(ReducerMap, ReducerConfiguration),
    EffectsModule.forRoot(EffectsConfiguration),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: true,
    }),
    StoreRouterConnectingModule.forRoot({
        serializer: CustomRouterSerializer,
    }),

    NgbDropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
