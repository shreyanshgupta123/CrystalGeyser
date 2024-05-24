import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../Services/cartservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any = null;
  quantity: number = 0;
  itemName: string = '';
  itemPrice: number = 0;
  totalPrice: number = 0;
  totalAmount: number = 0;
  discount: number = 0;
  deliveryCharges: number = 0;
  refundableDeposit: number = 0;
  overallPrice: number = 0;

  constructor(private cartService: CartserviceService, private router: Router) {}

  ngOnInit(): void {
    this.loadStoredData();
    this.fetchCartData();
  }

  loadStoredData(): void {
    const storedData = localStorage.getItem('selectedProduct');
    const storedQuantity = localStorage.getItem('quantity');

    if (storedData) {
      try {
        this.items = JSON.parse(storedData);
        this.itemName = this.items.productname;
        this.itemPrice = this.items.price;
      } catch (error) {
        console.error('Error parsing stored product data:', error);
        this.items = null;
      }
    }

    if (storedQuantity) {
      try {
        this.quantity = parseInt(storedQuantity, 10);
      } catch (error) {
        console.error('Error parsing stored quantity:', error);
        this.quantity = 0;
      }
    }
  }

  fetchCartData(): void {
    this.cartService.getCart().subscribe({
      next: data => {
        if (data && data.length) {
          const cartData = data[0];
          this.discount = cartData.discount || 0;
          this.deliveryCharges = cartData.delivery_charges || 0;
          this.refundableDeposit = cartData.refundable_deposit || 0;
          this.calculateTotalPrice();
        }
      },
      error: err => {
        console.error('Error fetching cart data:', err);
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.itemPrice * this.quantity;
    const discountedPrice = Math.max(this.totalPrice - this.discount, 0);
    this.overallPrice = discountedPrice + Number(this.deliveryCharges);
    this.totalAmount = this.overallPrice + Number(this.refundableDeposit);
  }

  checkout(): void {
    const token = sessionStorage.getItem('authToken');
    if (token) {

      this.router.navigateByUrl('/checkout');
    } else {

      this.router.navigateByUrl('/userlogin');
    }
  }

  increment(): void {
    this.quantity++;
    this.updateQuantityInLocalStorage();
    this.calculateTotalPrice();
  }

  decrement(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.updateQuantityInLocalStorage();
      this.calculateTotalPrice();
    }
  }

  updateQuantityInLocalStorage(): void {
    localStorage.setItem('quantity', this.quantity.toString());
  }
}
