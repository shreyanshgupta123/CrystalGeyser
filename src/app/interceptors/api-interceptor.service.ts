import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        if (token) {
          console.log('Token found:', token);
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          console.log('No token found');
        }
        console.log('Intercepted Request:', req);

        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('HTTP Error:', error);
            if (error.status === 401) {
              console.log('Unauthorized request - possibly due to expired token');
            }
            return throwError(error);
          })
        );
      })
    );
  }
}
