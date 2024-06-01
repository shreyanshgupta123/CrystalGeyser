import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CartserviceService } from '../../Services/cartservice.service';

@Component({
  selector: 'app-showselected-product',
  templateUrl: './showselected-product.component.html',
  styleUrls: ['./showselected-product.component.css']
})
export class ShowselectedProductComponent implements OnInit, AfterViewInit {
  product: any;
  fullStars: number | undefined;
  halfStars: number | undefined;
  emptyStars: number | undefined;
  averageRating: number = 0;
  bigImageUrl: string = '';
  @ViewChild('quantityContainer', { static: false }) quantityContainer!: ElementRef;
  @ViewChild('minusBtn', { static: false }) minusBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('plusBtn', { static: false }) plusBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('inputBox', { static: false }) inputBox!: ElementRef<HTMLInputElement>;

  products: any[] = [];
  userId: string = localStorage.getItem('userId') as string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartserviceService
  ) {}

  ngOnInit() {
    const productString = localStorage.getItem('selectedProduct');
    if (productString) {
      this.product = JSON.parse(productString);
    } else {
      this.route.queryParams.subscribe(params => {
        this.product = params;
      });
    }
    this.calculateAverageRating();
    this.viewProduct();
    this.bigImageUrl = this.products[0]?.image;
  }

  ngAfterViewInit() {
    this.initQuantityFunctionality();
  }

  viewProduct() {
    // console.log(this.product);
  }

  calculateAverageRating() {
    if (this.product && this.product.reviews && this.product.reviews.length > 0) {
      const totalRatings = this.product.reviews.reduce((sum: any, review: { rating: any; }) => sum + review.rating, 0);
      this.averageRating = totalRatings / this.product.reviews.length;
    } else {
      this.averageRating = 0;
    }
    this.updateStarRatings();
  }

  updateStarRatings() {
    this.fullStars = Math.floor(this.averageRating);
    this.halfStars = this.averageRating % 1 >= 0.5 ? 1 : 0;
    this.emptyStars = 5 - this.fullStars - this.halfStars;
  }

  initQuantityFunctionality() {
    const quantityContainer = this.quantityContainer.nativeElement;
    const minusBtn = this.minusBtn.nativeElement;
    const plusBtn = this.plusBtn.nativeElement;
    const inputBox = this.inputBox.nativeElement;

    this.updateButtonStates(minusBtn, plusBtn, inputBox);

    quantityContainer.addEventListener("click", (event: any) => this.handleButtonClick(event, minusBtn, plusBtn, inputBox));
    inputBox.addEventListener("input", () => this.handleQuantityChange(inputBox, minusBtn, plusBtn));
  }

  updateButtonStates(minusBtn: HTMLButtonElement, plusBtn: HTMLButtonElement, inputBox: HTMLInputElement) {
    const value = parseInt(inputBox.value);
    minusBtn.disabled = value <= 1;
    plusBtn.disabled = value >= parseInt(inputBox.max);
  }

  handleButtonClick(event: any, minusBtn: HTMLButtonElement, plusBtn: HTMLButtonElement, inputBox: HTMLInputElement) {
    if (event.target.classList.contains("minus")) {
      this.decreaseValue(inputBox, minusBtn, plusBtn);
    } else if (event.target.classList.contains("plus")) {
      this.increaseValue(inputBox, minusBtn, plusBtn);
    }
  }

  decreaseValue(inputBox: HTMLInputElement, minusBtn: HTMLButtonElement, plusBtn: HTMLButtonElement) {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : Math.max(value - 1, 1);
    inputBox.value = value.toString();
    this.updateButtonStates(minusBtn, plusBtn, inputBox);
    this.handleQuantityChange(inputBox, minusBtn, plusBtn);
  }

  increaseValue(inputBox: HTMLInputElement, minusBtn: HTMLButtonElement, plusBtn: HTMLButtonElement) {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : Math.min(value + 1, parseInt(inputBox.max));
    inputBox.value = value.toString();
    this.updateButtonStates(minusBtn, plusBtn, inputBox);
    this.handleQuantityChange(inputBox, minusBtn, plusBtn);
  }

  handleQuantityChange(inputBox: HTMLInputElement, minusBtn: HTMLButtonElement, plusBtn: HTMLButtonElement) {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : value;

    this.updateButtonStates(minusBtn, plusBtn, inputBox);

    // Update localStorage with the new quantity value
    localStorage.setItem('quantity', value.toString());
  }

  updateBigImage(imageUrl: string): void {
    this.bigImageUrl = imageUrl;
  }

  cart() {
    let cartItems = JSON.parse(localStorage.getItem('cartitem') || '[]');
    console.log('Current cart items:', cartItems);
    const existingItem = cartItems.find((item: any) => item.productid === this.product.id);
    if (!existingItem) {
      const quantity = parseInt(this.inputBox.nativeElement.value) || 1;
      const cartItem = {
        productid: this.product.id,
        userid: this.userId,
        quantity: quantity
      };
console.log(this.product.id,this.userId, quantity)
      this.cartService.addToCart(cartItem).subscribe(
        (response: any) => {
          console.log('Product added to cart', response);
          alert('Product added to cart and posted to the server!');

          // Update localStorage after successful API call
          cartItems.push(cartItem);
          localStorage.setItem('cartitem', JSON.stringify(cartItems));
          console.log('New cart item added:', cartItem);

          this.router.navigate(['/cart']);
        },
        (error: any) => {
          console.error('Error posting to cart', error);
          alert('Failed to add product to cart. Please try again later.');
        }
      );
    } else {
      alert('Product is already in the cart!');
    }
  }

  storeProduct(product: any) {
    let productsArray = JSON.parse(localStorage.getItem('selectedProductArray') || '[]');
    productsArray.push(product);
    localStorage.setItem('selectedProductArray', JSON.stringify(productsArray));
    console.log('Product stored in localStorage:', product);
    this.router.navigate(['/selecteditem'], { queryParams: product });
  }
}
