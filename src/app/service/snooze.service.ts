import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnoozeService {
  //--------------defiend base url-----------------------------------------
  baseUri: string = 'http://localhost:4001/';

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

}



