import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baserUrl } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = `${baserUrl}`

  constructor(private http: HttpClient) { }

  userLogin(data:any): Observable<any> {
    console.log('in server');
    return this.http.post<any>(`${this.baseUrl}users`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
 Cart(data:any): Observable<any> {
    console.log('in server');
    return this.http.post<any>(`${this.baseUrl}cart`, data).pipe(
      catchError(this.handleError)
    );
  }

}
