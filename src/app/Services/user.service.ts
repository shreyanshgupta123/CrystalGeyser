import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from '../enviroment/enviroment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${baserUrl}`
  constructor(private http:HttpClient) { }

  getUserDetails():Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}users`).pipe(
      catchError(this.handleError)
    )
  }
    getUserReview():Observable<any>{
      return this.http.get<any>(`${this.baseUrl}review`).pipe(
        catchError(this.handleError)
      )
    }
    
    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      return throwError('Something went wrong; please try again later.');
    }
}
