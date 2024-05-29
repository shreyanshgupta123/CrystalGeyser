import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'] // Corrected the property name to styleUrls
})
export class MyOrderComponent {
  userOrder: any[] = [];
  id: any;
  OrderDetails:any

  constructor(
    private auth: AuthServiceService,
    private product:ProductsService

  ) {
    this.id = localStorage.getItem('userId');
    const userOrderString = localStorage.getItem('userorder');
    if (userOrderString) {
      this.userOrder = JSON.parse(userOrderString);
      //  console.log(this.userOrder)
    } else {
      console.error('User order data not found in localStorage.');
    }
  }

  selectOrder(select: string) {
    switch (select) {
      case 'current': {
this.userOrder.forEach((element:any)=>
{
  if(element.
    current_order_id
    )
    {
this.product.OrderById().subscribe(
  data=>{
   data.forEach((element:any)=>
  {
    // console.log(element.product_id)
    this.product.allProducts().subscribe(
      data2=>{
        // console.log(data2)
data2.forEach((element2:any)=>
{

  if(element.product_id==element2.id)
    {

this.OrderDetails=element2
// console.log('Here is the order details:',element2.productname)
    }
})
      }
    )
  })
  }
)
    }
})
        break;
      }
      default: {
        // Default case
        break;
      }
    }
  }
}
