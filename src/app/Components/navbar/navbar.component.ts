import { Component, AfterViewInit, OnInit, ElementRef, Renderer2, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isAdmin: boolean = false;
  cartItemCount: number = 0; // Initialize count to 0
  searchTerm: string = '';

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private prod:ProductsService
  ) {}
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Cast event target to HTMLInputElement
    if (inputElement) {
      const value = inputElement.value; // Access the value property
      console.log(value); // Output the typed value to the console
    }
  }
  ngOnInit(): void {
    this.authloginnav();
    this.getCartItemCount(); // Get cart item count on component initialization

  }

  ngAfterViewInit() {
    this.initializeDrawerFunctionality();
  }

  navigate(url: string): void {
    if (url === 'Products') {
      this.router.navigateByUrl(`home/${url}`);
    }
  }

  authloginnav() {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'Admin';
    }
  }

  logOut() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      localStorage.clear();
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

  initializeDrawerFunctionality() {
    const drawer = this.el.nativeElement.querySelector('#drawer-top-example');
    const showDrawerBtn = this.el.nativeElement.querySelector('#showDrawerBtn');
    const hideDrawerBtn = this.el.nativeElement.querySelector('[data-drawer-hide]');

    this.renderer.listen(showDrawerBtn, 'click', () => {
      this.renderer.setStyle(drawer, 'transform', 'translateY(0)');
    });

    this.renderer.listen(hideDrawerBtn, 'click', () => {
      this.renderer.setStyle(drawer, 'transform', 'translateY(-100%)');
    });
  }


}
