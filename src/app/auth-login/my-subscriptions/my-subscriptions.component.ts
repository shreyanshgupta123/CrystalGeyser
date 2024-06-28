import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  forPaused: any;

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
    this.authService.getUserDetails(this.userId!).subscribe(
      data => {
        console.log("this is=", data.subscription);
        if (Array.isArray(data.subscription)) {
          this.ActivesubscriptionsList = [];
          data.subscription.forEach((element: any) => {
            if (element.active_subscription_id) {
              this.subService.getActiveSubscriptionById(element.active_subscription_id).subscribe(activeData => {
                console.log("activeOne", activeData);
                this.ActivesubscriptionsList.push(activeData);
              });
            }
          });
        } else {
          console.error('Subscriptions data is not an array', data.subscription);
        }
      },
      error => console.error('Error fetching user details', error)
    );
  }

  pausedSubscription(id: string): void {
    this.forPaused = id;
    console.log('This is allsub id=', this.forPaused);

    this.subService.addPausedSubscription(id).pipe(
      switchMap(data => {
        console.log('This is paused id', data.id);
        if (data.id) {
          const updatedata = {
            active_subscription_id: null,
            cancelled_subscription_id: null,
            paused_subscription_id: data.id
          };
          return this.subService.Updateactivesubscription(updatedata, this.forPaused).pipe(
            tap(updated => {
              console.log('This is updated:', updated);
            })
          );
        } else {
          throw new Error('No paused subscription ID returned');
        }
      })
    ).subscribe(
      () => {
        this.getActiveUser();
        this.getPausedSubscription();
      },
      error => console.error('Error pausing subscription', error)
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
