import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute,private router: Router) {}
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
    this.showProducts();
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
    console.log("Quantity changed:", value);
    this.updateButtonStates(minusBtn, plusBtn, inputBox);

    // Update localStorage with the new quantity value
    localStorage.setItem('quantity', value.toString());
}



  products:any[]=[
  ]

  updateBigImage(imageUrl: string): void {
    this.bigImageUrl = imageUrl;
  }

cart()
{
  this.router.navigate(['/cart'])
}
  showProducts() {
    // console.log(this.products);
  }

  storeProduct(product: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    console.log('Product stored in localStorage:', product);
    this.router.navigate(['/selecteditem'], { queryParams: product });

  }
}
