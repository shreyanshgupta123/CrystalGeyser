import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin, Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { SubscriptionService } from '../../Services/subscription.service';
import { AuthServiceService } from '../../Services/auth-service.service';
interface SubscriptionModel {
  active_subscription_id: string;
  id: string;
  purchased_date: string;
  new_expired_date: string;
  price: number;
  subscription_type: string;
  subscription_id: string;
  validity_duration:{
    days: number;
  }
}
interface SubscriptionModel2 {
  expired_date:string;
  from_date:string;
  paused_days:string;
  id:string;
  price:string;
}
@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit, OnDestroy {
  ActivesubscriptionsList: SubscriptionModel[] = [];
  PausedsubscriptionsList: SubscriptionModel2[] = [];
  private subscriptions: Subscription = new Subscription();
  userId: string | null = null;
  toastVisible = false;
  toastVisible2 = false;
  constructor(
    private subService: SubscriptionService,
    private authService: AuthServiceService,
  ) {}
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.loadUserSubscriptions();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  private loadUserSubscriptions(): void {
    this.getUserDetails();
    this.getPausedSubscriptions();
  }
  private getUserDetails(): void {
    if (this.userId) {
      this.authService.getUserDetails(this.userId).subscribe(
        data => {
          data.subscription.forEach((element: any) => {
            if (element.active_subscription_id) {
              this.subService.getActiveSubscriptionByid(element.active_subscription_id).subscribe(
                data3 => {
                  this.ActivesubscriptionsList.push(data3);
                  console.log(this.ActivesubscriptionsList)
                },
                error => {
                  console.error('Error fetching active subscription:', error);
                }
              );
            } else if(element.paused_subscription_id)
              {
     console.log(element.paused_subscription_id)
     this.subService.getPausedSubscriptionById(element.paused_subscription_id).subscribe(data=>{
console.log(data)
this.PausedsubscriptionsList.push(data)


     })
              }
          });
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }
  pauseSubscription(id: string, sub: string,priceOfItem:any): void {
    let actid = id;
    console.log(sub, id);
    this.subService.getActiveSubscriptionByid(id).subscribe(
      data => {
        const createPausedSubscription = {
          from_date: this.formatDate(data.purchased_date),
          expired_date: this.formatDate(data.expired_date),
          user_id: this.userId,
          subscription_id: id,
          is_paused: true,
          price:priceOfItem
        };
        this.subService.addPausedSubscription(createPausedSubscription).subscribe(
          data => {
            console.log('pausedsub', data.id);
            const fornull = {
              active_subscription_id: null,
              cancelled_subscription_id: null,
              paused_subscription_id: data.id,
              user_id: this.userId
            };
            console.log(fornull);
            this.subService.Updateactivesubscription(fornull, sub).subscribe(
              data => {
                console.log(data);
                this.subService.DeleteActiveSubscription(id).subscribe(
                  data => {
                    console.log('Finally Deleted', data);
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  private formatDate(dateString: string): string {
    return dateString.split('T')[0];
  }

  cancelOrder(id: string): void {
    this.subscriptions.add(
      this.subService.subscriptionById(id).pipe(
        switchMap(data => {
          const cancelOrderData = {
            price: data.price,
            subscription_type: data.subscription_type,
            purchasedDate: data.purchased_date
          };
          return this.subService.cancelSubscription(cancelOrderData, id)
            .pipe(
              catchError(err => {
                console.error('Error cancelling subscription', err);
                return of(null);
              })
            );
        })
      ).subscribe(
        response => {
          if (response) {
            console.log('Subscription cancelled successfully', response);
            this.loadUserSubscriptions();
          }
        },
        error => console.error('Error cancelling subscription', error)
      )
    );
  }
  private getPausedSubscriptions(): void {
    this.subscriptions.add(
      this.subService.getPausedSubscription().pipe(
        catchError(error => {
          console.error('Error fetching paused subscriptions', error);
          return of([]);
        })
      ).subscribe(
        data => {
          if (Array.isArray(data)) {
            this.PausedsubscriptionsList = data as SubscriptionModel2[];
          } else {
            console.error('Paused subscriptions data is not an array', data);
          }
        }
      )
    );
  }
}
