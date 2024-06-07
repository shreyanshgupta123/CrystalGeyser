import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../Services/cartservice.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { SubscriptionService } from '../../Services/subscription.service';

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
  discount: number = 1;
  deliveryCharges: number = 0.5;
  refundableDeposit: number = 0;
  overallPrice: number = 0;
  selectedPlan: number = 0;
  subscriptionPrice: number = 0;
  selectedDay: string = '';
  productPrice:number=0;
  subPrice:number=0;
  userId:any

  constructor(private cartService: CartserviceService,
     private router: Router,
     private prod: ProductsService,
     private sub:SubscriptionService
    ) {}

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
    const token = sessionStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      this.cartService.getCart().subscribe({
        next: data => {
          this.items = data.filter((item: any) => item.user_id === userId);
          this.items.forEach((item: any) => {

            this.prod.getProductById(item.product_id).subscribe({
              next: (productDetails: any) => {
                item.productDetails = productDetails;
                this.productPrice=productDetails.price
                                console.log('Product details:', this.productPrice);
              },
              error: err => {
                console.error('Error fetching product details:', err);
              }
            });
          });
          this.calculateTotalPrice();
        },
        error: err => {
          console.error('Error fetching cart data:', err);
        }
      });
    } else {
      this.loadStoredData();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.items.reduce((sum, item) => {
      const quantity = this.quantities[item.id] || 1;
      const itemPrice = parseFloat(item.price);
      if (isNaN(itemPrice)) {
        console.error('Item price is not a number:', item.price);
        return sum;
      }
      return sum + (itemPrice * quantity);
    }, 0);

    const discountValue = parseFloat(this.discount.toString());
    const deliveryChargesValue = parseFloat(this.deliveryCharges.toString());
    const refundableDepositValue = parseFloat(this.refundableDeposit.toString());

    const discountedPrice = Math.max(this.totalPrice - discountValue, 0);
    this.overallPrice = discountedPrice + deliveryChargesValue;
    this.totalAmount = this.overallPrice + refundableDepositValue;
  }

  checkout(): void {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.router.navigateByUrl('/checkout');
      localStorage.setItem('TotalAmount', this.totalAmount.toString());
    } else {
      this.router.navigateByUrl('/userlogin');
    }
  }

  increment(item: any): void {
    const id = item.id;
    const userId = localStorage.getItem('userId')!;
    this.quantities[id] = (this.quantities[id] || 1) + 1;
    this.updateQuantitiesInLocalStorage();
    this.updateCartItemQuantity({ id, userid: userId, quantity: this.quantities[id] });
    this.calculateTotalPrice();
  }

  decrement(item: any): void {
    const id = item.id;
    const userId = localStorage.getItem('userId')!;
    if (this.quantities[id] > 1) {
      this.quantities[id]--;
      this.updateQuantitiesInLocalStorage();
      this.updateCartItemQuantity({ id, userid: userId, quantity: this.quantities[id] });
      this.calculateTotalPrice();
    }
  }

  updateCartItemQuantity(cartItem: { id: string; userid: string; quantity: number }): void {
    this.cartService.updateCartItemQuantity(cartItem).subscribe({
      next: response => {
        console.log('Cart item quantity updated:', response);
      },
      error: err => {
        console.error('Error updating cart item quantity:', err);
      }
    });
  }

  updateQuantitiesInLocalStorage(): void {
    localStorage.setItem('quantities', JSON.stringify(this.quantities));
  }

  removeItem(item: any): void {
    const cartItemId = item.id;
    const index = this.items.findIndex(i => i.id === cartItemId);
    if (index !== -1) {
      this.cartService.deleteCartItem(cartItemId).subscribe({
        next: () => {
          this.items.splice(index, 1);
          delete this.quantities[cartItemId];
          localStorage.setItem('cartitem', JSON.stringify(this.items));
          this.updateQuantitiesInLocalStorage();
          this.calculateTotalPrice();
        },
        error: err => {
          console.error('Error deleting cart item:', err);
        }
      });
    }
  }

  selectPlan(planValue: number): void {
    this.selectedPlan = planValue;
    this.addSubscription(planValue, '9909ce77-02fe-49a5-840f-dad31e903a56');
  }

  addSubscription(plan: number, subscriptionId: string): void {
    console.log('Adding subscription for plan:', plan, 'with ID:', subscriptionId);
  }

  subscriptionType:string|null=''
  selectChangeHandler(event: Event): void {
    const selectedDay = (event.target as HTMLSelectElement).value;
    let price = 0;

    if (selectedDay === '9909ce77-02fe-49a5-840f-dad31e903a56') {
      console.log('1 Month selected');
      price = this.productPrice * 30*0.9;
      this.subPrice=price
      this.subscriptionType='9909ce77-02fe-49a5-840f-dad31e903a56'
      console.log('Price',  this.subPrice);
    } else if (selectedDay === '7264f7c3-73b2-41c1-b0bc-83c28e19e97f') {
      console.log('6 Months selected');
      price = this.productPrice * 180*0.9;
      this.subPrice=price
      this.subscriptionType='7264f7c3-73b2-41c1-b0bc-83c28e19e97f'
      console.log('Price',  this.subPrice);
    } else if (selectedDay === 'e3f1d7db-fe68-4b82-8d02-6d7b9cd7f26d') {
      console.log('9 Months selected');
      price = this.productPrice * 270*0.9;
      this.subPrice=price
      this.subscriptionType='e3f1d7db-fe68-4b82-8d02-6d7b9cd7f26d'
      console.log('Price',  this.subPrice);
    } else if (selectedDay === 'df8acba7-11bb-494d-b238-815c63ed4d33') {
      console.log('12 Months selected');
      price = this.productPrice * 360*0.9;
      this.subPrice=price
      this.subscriptionType='df8acba7-11bb-494d-b238-815c63ed4d33'
      console.log('Price',this.subPrice);
    }

    const totalPriceInput = document.getElementById('totalPrice') as HTMLInputElement;
    totalPriceInput.value = price.toString();

}
subscriptionCategory:string|null=''
date:any
getDateValue(): void {
  const DateInput = document.getElementById('pickdate') as HTMLInputElement;
  this.subscriptionCategory='ea0e2c6a-a4ce-48a7-bf2c-c05c48d5497a'
  if (DateInput) {
    this.date = DateInput.value;
    this.userId = localStorage.getItem('userId');

    console.log('Selected date is: ' + this.date);
    console.log('Price', this.subPrice);
    console.log('userId', this.userId);
    console.log('subCategory', this.subscriptionCategory);
    console.log('subtype', this.subscriptionType);

    if (this.userId) {
      const payload = {
        user_id: this.userId,
        price: this.subPrice,
        suscription_type: this.subscriptionType,
        purchased_date: this.date
      };
console.log(this.subscriptionType)
      console.log('Payload:', payload);

      this.sub.addSubscription(payload).subscribe({
        next: (response) => {
          console.log('Subscription added successfully', response);
        },
        error: (error) => {
          console.error('Error adding subscription', error);
        }
      });
    } else {
      console.error('User ID is not available');
    }
  }
}
}
