import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baserUrl } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = `${baserUrl}`;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  private loadToken(): void {
    const token = sessionStorage.getItem('authToken');
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  userLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users`, data).pipe(
      catchError(this.handleError)
    );
  }

  Cart(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}cart`, data).pipe(
      catchError(this.handleError)
    );
  }

  Login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/login`, data).pipe(
      catchError(this.handleError)
    );
  }
getAllUsers():Observable<any>
{
  return this.http.get<any>(`${this.baseUrl}users`).pipe(
    catchError(this.handleError)
  );
}
  getUserDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}users/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getSubscriptionDetails():Observable<any>
  {
return this.http.get<any>(`${baserUrl}subscription`).pipe(
  catchError(this.handleError)
)
  }
  updateUserDetails(userId: string, userDetails: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}users/${userId}`, userDetails);
  }

  updateAlternateAddress(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}alternateaddress/${id}`, data);
  }

  getAlternateAddressById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}alternateaddress/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  createAlternateAddress(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}alternateaddress`, data);
  }
  deleteAlternateAddress(id: any): Observable<any> {
    const url = `${this.baseUrl}alternateaddress/${id}`;
    return this.http.delete<any>(url);
  }
  forgotEmail(data:any):Observable<any>{
    return this.http.post(`${baserUrl}forgetpassword`,data).pipe(
      catchError(this.handleError)
    );
  }
  resetpassword(data: { token: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}forgetpassword/resetpassword`, data).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }




}
