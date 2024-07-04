import { Component, AfterViewInit, OnInit, ElementRef, Renderer2, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isAdmin: boolean = false;
  cartItemCount: number = 0;
  searchTerm: string = '';
searchData:any[]=[]
  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private prod:ProductsService,
    private cookies:CookieService
  ) {}
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      console.log(value);
      this.prod.searchProducts(value).subscribe(
        data=>{
          this.searchData=data
        }
      )
    }
  }
  ngOnInit(): void {
    this.authloginnav();
    this.getCartItemCount();

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
      const role2=this.cookies.get('role')
      if(role||role2)
        {
          this.isAdmin = role === 'Admin';
        }

    }
  }

  logOut() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      this.cookies.delete('authToken')
      this.cookies.deleteAll()
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
  selectedProduct(productId: string): void {
    console.log(productId);
    this.prod.getProductById(productId).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('selectedProduct', JSON.stringify(data));
        this.router.navigate(['selecteditem']);
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }


}
