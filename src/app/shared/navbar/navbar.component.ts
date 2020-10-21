import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthapiService } from 'src/app/service/authapi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any
  username: ''
  userName:''
  mySubscription: any;

  constructor(public router: Router, public authService: AuthapiService) {
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
    this.userName=this.currentUser['userCredentials'].name || ''
    if(this.userName){
      this.username=this.userName
    }
    else{ 
      console.log("not found")
    }
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

