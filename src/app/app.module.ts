import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navigation/navbar/navbar.component';
import { LessonComponent } from './lesson/lesson.component';
import { ChatComponent } from './chat/chat.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule} from '@angular/common/http'

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { AuthentifService } from './shared/service/authentif/authentif.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LessonComponent,
    ChatComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    AuthentifService,
    AuthentifService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
