import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Check if sessionStorage is available
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        return true;
      }
    }

    // Redirect to login page if the token is not present or sessionStorage is not available
    this.router.navigate(['/userlogin']);
    return false;
  }
}
