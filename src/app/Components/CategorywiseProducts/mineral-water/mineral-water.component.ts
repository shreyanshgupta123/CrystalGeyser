import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-mineral-water',
  templateUrl: './mineral-water.component.html',
  styleUrl: './mineral-water.component.css'
})
export class MineralWaterComponent {
  products: any[] = [];
  isLoading: boolean = false;
  Category: any[] = [];
  categoryToMatch: string = '';

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getByCategoryId().subscribe(
      data => {
        this.Category = data;
        const distilledWaterCategoryIds = this.Category.filter(category => category.category_name === 'Mineral water').map(category => category.id);
        this.productsService.allProducts().subscribe(
          productsData => {

            this.products = productsData.filter(product => distilledWaterCategoryIds.includes(product.category_id));
            this.isLoading = false;
            console.log(this.products);
          },
          error => {
            console.error('Error fetching products', error);
            this.isLoading = false;
          }
        );
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }
  storeProduct(product: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    console.log('Product stored in localStorage:', product);
    this.router.navigate(['/selecteditem'], { queryParams: product });
  }
}
