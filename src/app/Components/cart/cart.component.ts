import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../Services/cartservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  quantities: { [key: string]: number } = {};
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
    const storedCartItems = localStorage.getItem('cartitem');
    const storedQuantities = localStorage.getItem('quantities');

    if (storedCartItems) {
      try {
        this.items = JSON.parse(storedCartItems);
      } catch (error) {
        console.error('Error parsing stored cart items:', error);
        this.items = [];
      }
    }

    if (storedQuantities) {
      try {
        this.quantities = JSON.parse(storedQuantities);
      } catch (error) {
        console.error('Error parsing stored quantities:', error);
        this.quantities = {};
      }
    }

    this.calculateTotalPrice();
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
    this.totalPrice = this.items.reduce((sum, item) => {
      const quantity = this.quantities[item.id] || 1;
      return sum + (item.price * quantity);
    }, 0);
    const discountedPrice = Math.max(this.totalPrice - this.discount, 0);
    this.overallPrice = discountedPrice + this.deliveryCharges;
    this.totalAmount = this.overallPrice + this.refundableDeposit;
  }

  checkout(): void {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.router.navigateByUrl('/checkout');
    } else {
      this.router.navigateByUrl('/userlogin');
    }
  }

  increment(item: any): void {
    const id = item.id;
    this.quantities[id] = (this.quantities[id] || 1) + 1;
    this.updateQuantitiesInLocalStorage();
    this.calculateTotalPrice();
  }

  decrement(item: any): void {
    const id = item.id;
    if (this.quantities[id] > 1) {
      this.quantities[id]--;
      this.updateQuantitiesInLocalStorage();
      this.calculateTotalPrice();
    }
  }

  updateQuantitiesInLocalStorage(): void {
    localStorage.setItem('quantities', JSON.stringify(this.quantities));
  }

  removeItem(item: any): void {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      delete this.quantities[item.id];
      localStorage.setItem('cartitem', JSON.stringify(this.items));
      this.updateQuantitiesInLocalStorage();
      this.calculateTotalPrice();
    }
  }
}
