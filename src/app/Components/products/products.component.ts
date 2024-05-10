import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private route: Router) {}

  ngOnInit() {}

  showAllProduct: boolean = false;

  toggleAllProducts() {
    this.showAllProduct = !this.showAllProduct;
  }

  showAllProducts(url: string) {
    this.route.navigateByUrl(`/products/${url}`);
  }
}
