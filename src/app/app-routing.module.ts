import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './authentification/login/login.component';
import { RegisterComponent} from './authentification/register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ChatComponent } from './chat/chat.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'lessons',
    component: LessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
