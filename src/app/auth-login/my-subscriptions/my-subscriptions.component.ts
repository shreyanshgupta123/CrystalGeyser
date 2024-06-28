import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SubscriptionService } from '../../Services/subscription.service';
import { AuthServiceService } from '../../Services/auth-service.service';

interface SubscriptionModel {
  active_subscription_id: string;
  id: string;
  purchased_date: string;
  new_expired_date: string;
  price: number;
  subscription_type: string;
}

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit, OnDestroy {
  ActivesubscriptionsList: SubscriptionModel[] = [];
  PausedsubscriptionsList: SubscriptionModel[] = [];
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
    if (!this.userId) return;

    const userDetails$ = this.authService.getUserDetails(this.userId);

    this.subscriptions.add(
      userDetails$.pipe(
        tap(data => console.log("this is=", data.subscription)),
        switchMap(data => {
          if (Array.isArray(data.subscription)) {
            const activeSubs$: Observable<SubscriptionModel>[] = data.subscription.map((element: any) => {
              if (element.active_subscription_id) {
                return this.subService.getActiveSubscriptionById(element.active_subscription_id);
              }
              return null;
            }).filter((obs:any): obs is Observable<SubscriptionModel> => obs !== null);

            return forkJoin(activeSubs$);
          } else {
            console.error('Subscriptions data is not an array', data.subscription);
            return [];
          }
        })
      ).subscribe(
        activeSubs => this.ActivesubscriptionsList = activeSubs as SubscriptionModel[],
        error => console.error('Error fetching active subscriptions', error)
      )
    );
  }

  pauseSubscription(id: string): void {
    this.subscriptions.add(
      this.subService.DeleteActiveSubscription(id).subscribe(
        data => {
          console.log('This is deleted:', data);
          this.loadUserSubscriptions();
        },
        error => console.error('Error deleting subscription', error)
      )
    );
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
          return this.subService.cancelSubscription(cancelOrderData, id);
        })
      ).subscribe(
        response => {
          console.log('Subscription cancelled successfully', response);
          this.loadUserSubscriptions();
        },
        error => console.error('Error cancelling subscription', error)
      )
    );
  }

  private getPausedSubscriptions(): void {
    this.subscriptions.add(
      this.subService.getPausedSubscription().subscribe(
        data => {
          if (Array.isArray(data)) {
            this.PausedsubscriptionsList = data as SubscriptionModel[];
          } else {
            console.error('Paused subscriptions data is not an array', data);
          }
        },
        error => console.error('Error fetching paused subscriptions', error)
      )
    );
  }
}
