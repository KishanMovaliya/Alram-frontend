import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthapiService } from 'src/app/service/authapi.service';
import { RxjsdataService } from 'src/app/service/rxjsdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any
  mySubscription: any;
  submitted = false
  returnUrl: string;

  constructor(public apiService: AuthapiService, public router: Router, private route: ActivatedRoute,
     private rxjsDataService: RxjsdataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  //------------------Create Login Form--------------------------------
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get myForm() {
    return this.loginForm.controls;
  }

  //----------------------Calling login Function---------------------------
  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    if (this.loginForm.valid) {
      this.apiService.userLogin(this.loginForm.value).pipe(first()).subscribe(
        (data: any) => {
          let token = data.token;
          localStorage.setItem('Token', token);
          localStorage.setItem("user", JSON.stringify(data))
          this.rxjsDataService.updateLoginStatus(true);
          this.router.navigate([this.returnUrl]);
          Swal.fire("login Success!", "You login Successfully", "success")
        },
        (err: HttpErrorResponse) => {
          Swal.fire("fail to Login")
          if (err.error.msg) {
            Swal.fire("wrong email and password ")
          } else {
            Swal.fire("user not found")
          }
        }
      );
    }
  }


}
