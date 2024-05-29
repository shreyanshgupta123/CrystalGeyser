import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ProductsService } from '../../Services/products.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  userOrder: any[] = [];
  id: any;
  orderDetails: any;
products:any;
orderDetail: any;
  constructor(
    private auth: AuthServiceService,
    private product: ProductsService
  ) {
    this.id = localStorage.getItem('userId');
    const userOrderString = localStorage.getItem('userorder');
    if (userOrderString) {
      this.userOrder = JSON.parse(userOrderString);
    } else {
      console.error('User order data not found in localStorage.');
    }
  }

  selectOrder(select: string) {
    switch (select) {
      case 'current':
        this.handleOrderType('current_order_id');
        break;
      case 'delivered':
        this.handleOrderType('delivered_order_id');
        break;
      case 'canceled':
        this.handleOrderType('cancelled_order_id');
        break;
      default:
        break;
    }
  }

  private handleOrderType(orderType: string) {
    const relevantOrders = this.userOrder.filter(order => order[orderType]);
    const observables = relevantOrders.map(order => {
      return this.product.OrderByIdCurrent(order[orderType]).pipe(
        switchMap(orderData => {
          return this.product.allProducts().pipe(
            map(products => {
              const product = products.find(p => p.id === orderData.product_id);
              return { ...orderData, product };
            })
          );
        })
      );
    });

    forkJoin(observables).subscribe(
      mergedOrders => {
        this.orderDetails = mergedOrders;
        console.log(this.orderDetails)
        this.orderDetails.forEach((element:any) => {
        console.log(element)
        this.orderDetail=element
        this.products=element.product;

        });
      },
      error => {
        console.error('Error fetching order details:', error);
      }
    );
  }
}
