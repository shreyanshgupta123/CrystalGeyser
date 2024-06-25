import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
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
  private subscription: Subscription = new Subscription();
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
      this.getActiveUser();
      this.getPausedSubscription();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getActiveUser(): void {
    this.subscription.add(
      this.authService.getUserDetails(this.userId!).pipe(
        tap(data => {
          this.ActivesubscriptionsList = data.subscription;
          localStorage.setItem('ActiveSubscription', JSON.stringify(this.ActivesubscriptionsList));
        }),
        switchMap(data => {
          const activeSubscriptionObservables = data.subscription.map((element: any) =>
            this.subService.getActiveSubscriptionById(element.active_subscription_id)
          );
          return forkJoin(activeSubscriptionObservables);
        })
      ).subscribe(
        actSubscriptions => {
          this.ActivesubscriptionsList = actSubscriptions as SubscriptionModel[];
          localStorage.setItem('Activesub', JSON.stringify(this.ActivesubscriptionsList));
        },
        error => console.error('Error fetching active subscriptions', error)
      )
    );
  }

  pausedSubscription(id: string): void {
    this.subscription.add(
      this.subService.getActiveSubscriptionById(id).subscribe(
        data => {
          const pausedsubobject = {
            from_date: data.purchased_date,
            expired_date: data.new_expired_date,
            user_id: this.userId,
            subscription_id: data.id,
            is_paused: true
          };
   
          this.subscription.add(
            this.subService.addPausedSubscription(pausedsubobject).subscribe(
              response => {
                console.log('Subscription paused successfully', response);
                this.getPausedSubscription();
              },
              error => console.error('Error pausing subscription', error)
            )
          );
        },
        error => console.error('Error fetching subscription by id', error)
      )
    );
  }

  cancelOrder(id: string): void {
    this.subscription.add(
      this.subService.subscriptionById(id).subscribe(
        data => {
          const cancelOrderData = {
            price: data.price,
            subscription_type: data.subscription_type,
            purchasedDate: data.purchased_date
          };
          this.subscription.add(
            this.subService.cancelSubscription(cancelOrderData, id).subscribe(
              response => {
                console.log('Subscription cancelled successfully', response);
                this.getActiveUser();
              },
              error => console.error('Error cancelling subscription', error)
            )
          );
        },
        error => console.error('Error fetching subscription by id', error)
      )
    );
  }

  getPausedSubscription(): void {
    this.subscription.add(
      this.subService.getPausedSubscription().subscribe(
        data => {
          this.PausedsubscriptionsList = data as SubscriptionModel[];
        },
        error => console.error('Error fetching paused subscriptions', error)
      )
    );
  }
}
