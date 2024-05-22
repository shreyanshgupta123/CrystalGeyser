import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  activeComponent: string = '';
  constructor(private route: Router) {}

  ngOnInit() {}

  showAllProduct: boolean = false;

  toggleAllProducts() {
    this.showAllProduct = !this.showAllProduct;
  }

  setActiveComponent(componentName:string)
  {
    this.activeComponent = componentName;
  }
  showAllProducts(url: string) {
    this.route.navigateByUrl(`/products/${url}`);
  }
}
