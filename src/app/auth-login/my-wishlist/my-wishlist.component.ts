import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.css'
})
export class MyWishlistComponent {
  wishListCount:any
  constructor(
    private prod:ProductsService

   )
  {
this.prod.getWishList().subscribe(data=>
  {
console.log(data)
this.wishListCount=data
data.forEach((element:any) => {
  console.log(element.product_id)

});
  }
)
  }

}
