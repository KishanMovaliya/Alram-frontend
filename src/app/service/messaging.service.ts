import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  currentUserEmail:any
  emailget:any
  idget:any
  
  baseUri: string = 'http://localhost:4001/';
  constructor(public angularFireMessaging: AngularFireMessaging,public http: HttpClient) { 
    // this.angularFireMessaging.messaging.map(
    //   (_messaging) => {
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //   }
    //   )
  }
  ngOnInit(){
    this.currentUserEmail = JSON.parse(localStorage.getItem('user'))
    this.emailget = this.currentUserEmail.userCredentials.email
    this.idget=this.currentUserEmail.userCredentials._id
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
    console.log("token",token);
    if(token){
      this.http.post(`${this.baseUri}user/addtoken`,token) 
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
