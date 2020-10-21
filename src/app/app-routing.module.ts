import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ShecduleComponent } from './components/shecdule/shecdule.component';
import { SnoozeOnComponent } from './components/snooze-on/snooze-on.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  //--------------------home path----------------------------------------------------------
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard], },

  //--------------------home path----------------------------------------------------------
  { path: 'home', component: HomeComponent },

  //--------------------create-employee path-----------------------------------------------
  { path: 'create-employee', component: EmployeeCreateComponent },

  //--------------------edit-employee path-------------------------------------------------
  { path: 'edit-employee/:id', component: EmployeeEditComponent },

  //--------------------employees-list path-------------------------------------------------
  { path: 'employees-list', component: EmployeeListComponent },

  //--------------------egistration path-----------------------------------------------------
  { path: 'registration', component: SignupComponent },

  //--------------------login path------------------------------------------------------------
  { path: 'login', component: LoginComponent },

  //--------------------sheduleemail path------------------------------------------------
  { path: 'sheduleemail', component: ShecduleComponent },

  //---------------------Profile path ----------------------------------------------------------
  { path:'profileget', component: ProfileComponent },

  //--------------------snoozeOn-------------------------------------------------------------
  { path:'snoozegetOn', component : SnoozeOnComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
