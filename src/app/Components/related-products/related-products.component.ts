import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  constructor(private router: Router) {}

ngOnInit() {
  this.showProducts();
}

showProducts() {

}

storeProduct(product: any) {
  localStorage.setItem('selectedProduct', JSON.stringify(product));

  this.router.navigate(['/selecteditem'], { queryParams: product });

}
}
