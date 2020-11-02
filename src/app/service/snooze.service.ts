import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SnoozeService {
  //--------------defiend base url-----------------------------------------
  baseUri: string = 'http://localhost:5000/';

  //--------------Defiend headers------------------------------------------
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  //--------------Get snooze details----------------------------------------
  getsnoozeshedules() {
    return this.http.get(`${this.baseUri}user/getsnooze`)
  }

  //--------------Update Snooze Status------------------------------------
  updateSnooze(id, data) {
    let url = `${this.baseUri}user/snoozeupdate/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
    )
  }

  //get notification
  notificationget(): Observable<any> {
    return this.http.get(`${this.baseUri}user/getnotification`)
  }

  //get notification status
  changestatusnotification(id, data) {
    let url = `${this.baseUri}user/notificationstatus/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
    )
  }

  //get notification
  getunreadnotification(): Observable<any> {
    return this.http.get(`${this.baseUri}user/getunreadstatus`)

  }


}



