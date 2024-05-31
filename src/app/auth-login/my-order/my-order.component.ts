import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ProductsService } from '../../Services/products.service';
import { forkJoin, map } from 'rxjs';
import { CancelledOrder, CurrentOrder, DeliveredOrder, Products } from '../../Interface/products.models';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  userOrder: any[] = [];
  id: string | null;
  orderDetails: CurrentOrder[] = [];
  orderDetails3: CancelledOrder[] = [];
  orderDetails2: DeliveredOrder[] = [];
  products: Products | undefined;
  userId: string | null;

  constructor(
    private auth: AuthServiceService,
    private product: ProductsService
  ) {
    this.id = localStorage.getItem('userId');
    this.userId = this.id; // Store userId for filtering
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
        this.handleOrderType();
        break;
      case 'delivered':
        this.handleOrderType2();
        break;
      case 'canceled':
        this.handleOrderType3();
        break;
      default:
        break;
    }
  }

  private handleOrderType() {
    this.product.OrderByListCurrent().subscribe(
      (currentOrders: unknown) => {
        const filteredOrders = (currentOrders as CurrentOrder[]).filter(order => order.user_id === this.userId);
        this.orderDetails = filteredOrders;
        const productObservables = this.orderDetails.map(order => {
          return this.product.getProductById(order.product_id).pipe(
            map(product => {
              order.product = product;
              return order;
            })
          );
        });

        forkJoin(productObservables).subscribe(
          (ordersWithProducts: CurrentOrder[]) => {
            this.orderDetails = ordersWithProducts;
          },
          (error: any) => {
            console.error('Error fetching product details for current orders:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching current orders:', error);
      }
    );
  }

  private handleOrderType2() {
    this.product.OrderByListDelivered().subscribe(
      (deliveredOrders: unknown) => {
        const filteredOrders = (deliveredOrders as DeliveredOrder[]).filter(order => order.user_id === this.userId);
        this.orderDetails2 = filteredOrders;
        const productObservables = this.orderDetails2.map(order => {
          return this.product.getProductById(order.product_id).pipe(
            map(product => {
              order.product = product;
              return order;
            })
          );
        });

        forkJoin(productObservables).subscribe(
          (ordersWithProducts: DeliveredOrder[]) => {
            this.orderDetails2 = ordersWithProducts;
          },
          (error: any) => {
            console.error('Error fetching product details for delivered orders:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching delivered orders:', error);
      }
    );
  }

  private handleOrderType3() {
    this.product.OrderByListCancelled().subscribe(
      (cancelledOrders: unknown) => {
        const filteredOrders = (cancelledOrders as CancelledOrder[]).filter(order => order.user_id === this.userId);
        this.orderDetails3 = filteredOrders;
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
