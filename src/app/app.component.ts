import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from './service/authapi.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'angularNode';


  constructor(public authService: AuthapiService,public router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit() {
    window.addEventListener("beforeunload",  (e)=> {
      this.authService.updateUserStatus();
      const options = {
        method: "GET",
        headers: new Headers({'Authorization': `Token ${localStorage.getItem('Token')}`}),
    };
      fetch('http://localhost:5000/user/updateuserStatus/1', options)
    });

    setTimeout(() => {
      this.authService.updateUserStatus().subscribe(res=>{
      });
    }, 4000);
  }
}
