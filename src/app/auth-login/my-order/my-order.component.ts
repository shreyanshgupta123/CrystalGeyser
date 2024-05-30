import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ProductsService } from '../../Services/products.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { CancelledOrder, Products } from '../../Interface/products.models';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  userOrder: any[] = [];
  id: string | null;
  orderDetails: any[] = [];
  orderDetails3: CancelledOrder[] = [];
  products: Products | undefined;
  products2: any;
  products3: any;
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
        this.handleOrderType2('delivered_order_id');
        break;
      case 'canceled':
        this.handleOrderType3();
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
        if (this.orderDetails.length > 0) {
          this.orderDetail = this.orderDetails[0];
          this.products = this.orderDetail.product;
        }
      },
      (error: any) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  private handleOrderType2(orderType: string) {
    const relevantOrders = this.userOrder.filter(order => order[orderType]);
    const observables = relevantOrders.map(order => {
      return this.product.OrderByIdDelivered(order[orderType]).pipe(
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
        if (this.orderDetails.length > 0) {
          this.orderDetail = this.orderDetails[0];
          this.products = this.orderDetail.product;
        }
      },
      (error: any) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  private handleOrderType3() {
    this.product.OrderByListCancelled().subscribe(
      (cancelledOrders: unknown) => {
        this.orderDetails3 = cancelledOrders as CancelledOrder[];
        const productObservables = this.orderDetails3.map(order => {
          return this.product.getProductById(order.product_id).pipe(
            map(product => {
              order.product = product;
              return order;
            })
          );
        });

        forkJoin(productObservables).subscribe(
          (ordersWithProducts: CancelledOrder[]) => {
            this.orderDetails3 = ordersWithProducts;
          },
          (error: any) => {
            console.error('Error fetching product details for cancelled orders:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching cancelled orders:', error);
      }
    );
  }
}
