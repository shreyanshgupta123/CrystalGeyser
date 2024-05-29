import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isAdmin: boolean = false;
  cartItemCount: number = 0; // Initialize count to 0

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.authloginnav();
    this.getCartItemCount(); // Get cart item count on component initialization
  }

  ngAfterViewInit() {
    // Your code for drawer functionality
  }

  navigate(url: string): void {
    if (url === 'Products') {
      this.router.navigateByUrl(`home/${url}`);
    }
  }

  authloginnav() {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      if (role === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

  logOut() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['home']);
      window.location.reload();
    }
  }

  getCartItemCount(): void {
    const cartItems = localStorage.getItem('cartitem');
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      this.cartItemCount = parsedCartItems.length; 
    }
  }
}
