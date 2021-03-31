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

import {MatToolbarModule} from '@angular/material/toolbar';

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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
