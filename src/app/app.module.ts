import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ApiService } from './service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ShecduleComponent } from './components/shecdule/shecdule.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ProfileComponent } from './auth/profile/profile.component';
import { FormsModule } from '@angular/forms';
import {NgToggleModule} from '@nth-cloud/ng-toggle';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {NumberPickerModule} from 'ng-number-picker';
import { SnoozeOnComponent } from './components/snooze-on/snooze-on.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ShecduleComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    SnoozeOnComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    DateTimePickerModule,
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    NgToggleModule,  
    UiSwitchModule,
    NumberPickerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
