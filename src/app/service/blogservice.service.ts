import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogserviceService {
  //--------------defiend base url-----------------------------------------
  baseUri: string = 'http://localhost:5000/';

  //--------------Defiend headers------------------------------------------
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //--------------Create Email Shedule Api----------------------------------------
  createblog(payload) {
    return this.http.post(`${this.baseUri}blog/createblog`, payload)
  }

  //--------------------Get blogs-----------------------------------------------
  getblog() {
    return this.http.get(`${this.baseUri}blog/getblog`)
  }

  getsingleblog(id){
     return this.http.get(`${this.baseUri}blog/singleblog/${id}`)
  }

  //---------------Add Comment--------------------------------------------------
  addcomment(id, data) {
    let url = `${this.baseUri}blog/addcomment/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //---------------Add Like-----------------------------------------------------------
  addlike(id, data) {
    let url = `${this.baseUri}blog/addlike/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //---------------Error handling--------------------------------
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
