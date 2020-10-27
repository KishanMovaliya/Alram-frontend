import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ShecduleComponent } from './components/shecdule/shecdule.component';
import { SnoozeOnComponent } from './components/snooze-on/snooze-on.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  //--------------------home path----------------------------------------------------------
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard], },

  //--------------------home path----------------------------------------------------------
  { path: 'home', component: HomeComponent },

  //--------------------egistration path-----------------------------------------------------
  { path: 'registration', component: SignupComponent },

  //--------------------login path------------------------------------------------------------
  { path: 'login', component: LoginComponent },

  //--------------------sheduleemail path------------------------------------------------
  { path: 'sheduleemail', component: ShecduleComponent },

  //---------------------Profile path ----------------------------------------------------------
  { path: 'profileget', component: ProfileComponent },

  //--------------------snoozeOn-------------------------------------------------------------
  { path: 'snoozegetOn', component: SnoozeOnComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
