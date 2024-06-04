import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../Services/cartservice.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

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
  selectedPlan: number =0;
subscriptionPrice:number=0;
selectedDay: string = '';
  constructor(private cartService: CartserviceService, private router: Router, private prod: ProductsService) {}

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
          console.log('Cart data:', data);

          this.items = data.filter((item: any) => item.user_id === userId);
          this.items.forEach((item: any) => {
            console.log(item);
            this.prod.getProductById(item.product_id).subscribe({
              next: (productDetails: any) => {
                item.productDetails = productDetails;
                console.log('Product details:', productDetails);
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

    console.log('Total Price:', this.totalPrice);
    console.log('Discount:', this.discount);
    console.log('Delivery Charges:', this.deliveryCharges);
    console.log('Refundable Deposit:', this.refundableDeposit);

    if (isNaN(this.totalPrice)) {
        console.error('Total Price calculation resulted in NaN. Check item prices and quantities.');
    }

    const discountValue = parseFloat(this.discount.toString());
    if (isNaN(discountValue)) {
        console.error('Discount value is not a number:', this.discount);
    }
    const deliveryChargesValue = parseFloat(this.deliveryCharges.toString());
    if (isNaN(deliveryChargesValue)) {
        console.error('Delivery Charges value is not a number:', this.deliveryCharges);
    }
    const refundableDepositValue = parseFloat(this.refundableDeposit.toString());
    if (isNaN(refundableDepositValue)) {
        console.error('Refundable Deposit value is not a number:', this.refundableDeposit);
    }

    const discountedPrice = Math.max(this.totalPrice - discountValue, 0);
    console.log('Discounted Price:', discountedPrice);

    this.overallPrice = discountedPrice + deliveryChargesValue;
    console.log('Overall Price:', this.overallPrice);

    this.totalAmount = this.overallPrice + refundableDepositValue;
    console.log('Total Amount:', this.totalAmount);

    if (isNaN(this.overallPrice)) {
        console.error('Overall Price is NaN. Check calculations and data.');
    }
    if (isNaN(this.totalAmount)) {
        console.error('Total Amount is NaN. Check calculations and data.');
    }
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
  selectPlan(planValue: number) {
    this.selectedPlan = planValue;
    this.addSubscription(planValue, '9909ce77-02fe-49a5-840f-dad31e903a56');
  }
  addSubscription(plan: number, subscriptionId: string) {

    console.log('Adding subscription for plan:', plan, 'with ID:', subscriptionId);

  }
  selectChangeHandler (event: any) {

    this.selectedDay = event.target.value;
console.log(this.selectedDay)
if(event.target.value=='9909ce77-02fe-49a5-840f-dad31e903a56')
  {

  }
  }
}
