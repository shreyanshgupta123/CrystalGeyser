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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,  // Inject ActivatedRoute
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Access and log the 'category_name' query parameter
    this.activatedRoute.queryParams.subscribe(params => {
      const category_id = params['category_id'];
      if (category_id) {
        // console.log('Category Name:', category_id);
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
    // console.log('Product stored in localStorage:', product);
    this.router.navigate(['/selecteditem'], { queryParams: product });
  }

  saveProductToLocalStorage(product: any) {
    // Check if the token is present in sessionStorage
    const token = sessionStorage.getItem('authToken');
    if (!token) {

      this.router.navigate(['/userlogin']);
      return;
    }

    // Retrieve the saved product IDs from localStorage
    const savedProductIds = JSON.parse(localStorage.getItem('savedProductIds') ?? '[]');

    // Add the new product ID to the array if it doesn't already exist
    if (!savedProductIds.includes(product.id)) {
      savedProductIds.push(product.id);
      localStorage.setItem('savedProductIds', JSON.stringify(savedProductIds));
      
      alert('Product ID saved!');
    } else {
      alert('Product ID is already saved!');
    }
  }
}
