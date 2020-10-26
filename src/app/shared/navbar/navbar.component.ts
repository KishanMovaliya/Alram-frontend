import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthapiService } from 'src/app/service/authapi.service';
import { SnoozeService } from 'src/app/service/snooze.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any
  username: ''
  userName: ''
  mySubscription: any;
  notification: any
  notific: any;
  getnotified: any
  time_get_create: any
  messageget: any
  fromuser: any
  getusername: any

  constructor(public router: Router, public authService: AuthapiService, public Authservice: SnoozeService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.userName = this.currentUser['userCredentials'].name || ''
    if (this.userName) {
      this.username = this.userName
    }

    //-----------notification get ------------------------------------------
    this.Authservice.notificationget().subscribe((res: any) => {
      this.notific = [res];
      this.notific.map(ress => {
        this.getnotified = ress.data
        this.getnotified.map(a => {
          this.time_get_create = a.createdAt
          this.messageget = a.message
          this.fromuser = a.from
        })
      })
    }
    )

    //-----------get login user info-------------------------------------
    this.authService.getuserlogin().subscribe((res: any) => {
      this.getusername = res.name
    })

  }

  //-------------logout ---------------------------------------------------
  logout() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      text: 'You will Back to login !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('Token');
        localStorage.removeItem('currentUserLogin')
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
        this.ngOnInit();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'welcomeback :)',
          'error'
        )

      }

    })

  }
}

