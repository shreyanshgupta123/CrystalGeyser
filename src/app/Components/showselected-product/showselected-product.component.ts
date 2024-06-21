import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CartserviceService } from '../../Services/cartservice.service';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  UsersReview:any[]=[];
  reviewForm!: FormGroup;
  productId:any
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
    private cartService: CartserviceService,
    private UserService:UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.UserReview()
    const productString = localStorage.getItem('selectedProduct');
    if (productString) {
      this.product = JSON.parse(productString);
      // console.log(this.product.id)
    } else {
      this.route.queryParams.subscribe(params => {
        this.product = params;

      });
    }
    this.calculateAverageRating();
    this.viewProduct();
    this.bigImageUrl = this.products[0]?.image;
    this.initForm();
  }

  ngAfterViewInit() {
    this.initQuantityFunctionality();
  }

  viewProduct() {

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

  UserReview():void{
    this.UserService.getUserReview().subscribe(
     data=> {
console.log(data)
this.UsersReview=data
      }
    )
  }
  initForm()

  {
if(this.userId)
  {
    this.reviewForm=this.fb.group({
      customer:['', Validators.required],
      rating:5.0,
      comments:['',Validators.required],
      user_id:this.userId,
      product_id:this.product.id,
      title:['', Validators.required],
      image_url:['', Validators.required]
    })

  }else{
    this.reviewForm=this.fb.group({
      customer:'Unknown',
      rating:5.0,
      comments:['',Validators.required],
      user_id:null,
      product_id:this.product.id,
      title:['', Validators.required],
      image_url:['', Validators.required]
    })


  }
this.UserService.addUserReview(this.reviewForm).subscribe(
  data=>{
  console.log(this.reviewForm)
})
  }
  onSubmit() {
    console.log('Form submitted');

    if (this.reviewForm.valid) {

      console.log('Form is valid', this.reviewForm.value);
      this.UserService.addUserReview(this.reviewForm.value).subscribe(
        result => {
          console.log('Server response', result);

        },
        error => {
          console.error('Registration failed', error);

        }
      );
    } else {
      console.warn('Form is invalid');

    }
  }

  }

