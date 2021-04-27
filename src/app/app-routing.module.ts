import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './authentification/login/login.component';
import { RegisterComponent} from './authentification/register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ChatComponent } from './chat/chat.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthentifGuardGuard } from './authentification/authentif-guard.guard';
import { ChangePasswordComponent } from './authentification/change-password/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
    canActivate: [AuthentifGuardGuard]
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
    component: QuizComponent,
    canActivate: [AuthentifGuardGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthentifGuardGuard]
  },
  {
    path: 'lessons',
    component: LessonComponent,
    canActivate: [AuthentifGuardGuard]
  },
  {
    path: 'change',
    component: ChangePasswordComponent
  },
  {
    path: '**',
    redirectTo: '/', // sau putem sa facem un 404 page daca e 
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
