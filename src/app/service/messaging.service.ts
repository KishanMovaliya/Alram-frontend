import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthapiService } from './authapi.service';
import { SnoozeService } from './snooze.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  currentUserEmail: any
  emailget: any
  idget: any
  tokenget: any
  getusername: any
  token: any
  getdata: any = []
  gettokenstatus: any
  tokenvalue: any
  constructor(public angularFireMessaging: AngularFireMessaging, public http: HttpClient,
    public snoozeservice: SnoozeService, public authService: AuthapiService) {
  
    this.currentUserEmail = JSON.parse(localStorage.getItem('user')) || "not lOgin"
    this.emailget = this.currentUserEmail.userCredentials.email || "Not login"
    this.idget = this.currentUserEmail.userCredentials._id  || "Not login"
    // this.snoozeservice.getnotificationtoken().subscribe((res: any)=>{
    //   this.token=[res]
    //   this.getdata=this.token
    //   this.getdata.map(res=>{
    //     this.gettokenstatus=res.data
    //     this.gettokenstatus.map(res=>{
    //       this.tokenvalue=res.notificationToken
    //       console.log(this.tokenvalue)
    //     })
    //     console.log("resss", this.gettokenstatus)
    //   })
    // })
  }
  ngOnInit() {
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        if (token) {
          let data = {
            userId: this.idget,
            email: this.emailget,
            notificationToken: token
          }
          this.snoozeservice.addtoken(data).subscribe(res => { })
        }
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}
