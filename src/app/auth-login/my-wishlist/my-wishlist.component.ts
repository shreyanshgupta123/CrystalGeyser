import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.css']
})
export class MyWishlistComponent implements OnInit {
  wishListCount: number | undefined;
  prodData: any[] = [];  // Initialize as an array

  constructor(private prod: ProductsService) { }

  ngOnInit(): void {
    this.prod.getWishList().subscribe(data => {

      this.wishListCount = data.length;
      data.forEach((element: any) => {

        this.prod.getProductById(element.product_id).subscribe(productData => {
         
          this.prodData.push(productData);
        });
      });
    });
  }
}
