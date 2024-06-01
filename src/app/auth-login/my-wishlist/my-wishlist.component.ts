import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Observable, forkJoin } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.css']
})
export class MyWishlistComponent implements OnInit {
  wishListCount: number | undefined;
  prodData: any[] = [];
  userId: any;
  wishList: any[] = [];
  filter2: any[] = []; // Array to store filtered products

  constructor(
    private prod: ProductsService,
    private auth: AuthServiceService
  ) { }

  ngOnInit(): void {
    const userid = localStorage.getItem('userId');
    this.userId = userid;

    this.auth.getUserDetails(this.userId).subscribe(
      data => {
        if (data && data.wishlist) {
          this.wishList = data.wishlist;
          console.log('Wishlist:', this.wishList);

          // Extract product IDs from wishlist
          const productIds = this.wishList.map(item => item.product_id);

          // Fetch products by IDs
          if (productIds.length > 0) {
            forkJoin(productIds.map(productId => this.prod.getProductById(productId))).subscribe(
              products => {
                this.filter2 = products;
                console.log('Filtered Products:', this.filter2);
              },
              error => {
                console.error('Error fetching products:', error);
              }
            );
          }
        }
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
