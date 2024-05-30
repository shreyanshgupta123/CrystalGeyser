import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = false;
  userId: string | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = localStorage.getItem('userId');

    this.activatedRoute.queryParams.subscribe(params => {
      const category_id = params['category_id'];
      if (category_id) {
        // Do something with category_id if needed
      }
    });

    this.productsService.allProducts().subscribe(
      data => {
        this.products = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching products', error);
        this.isLoading = false;
      }
    );
  }

  storeProduct(product: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.router.navigate(['/selecteditem'], { queryParams: product });
  }

  saveProductToLocalStorage(product:any) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/userlogin']);
      return;
    }

    const savedProductIds = JSON.parse(localStorage.getItem('savedProductIds') ?? '[]');
    if (!savedProductIds.includes(product.id)) {
      savedProductIds.push(product.id);
      localStorage.setItem('savedProductIds', JSON.stringify(savedProductIds));

      // Pass userId and productId to the wishlist function
      console.log(product.id,this.userId)
      this.productsService.wishList({ productid: product.id, userid: this.userId }).subscribe(

        response => {
          console.log(product.id,this.userId)
          alert('Product ID saved and posted to wishlist!');
        },
        error => {
          console.error('Error posting to wishlist', error);
          alert('Failed to post to wishlist. Please try again later.');
        }
      );
    } else {
      alert('Product ID is already saved!');
    }
  }
}
