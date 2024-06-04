import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SubscriptionService } from '../../Services/subscription.service';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit, OnDestroy {
  subscriptionsList: any[] = [];  // Define the property to hold subscription data
  isActive: string | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private subService: SubscriptionService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadSubscriptions(): void {
    const subscription = this.subService.getSubscription().pipe(
      switchMap(data => data),
      switchMap((element: any) => this.authService.getUserDetails(element.user_id)),
      tap((data2: any) => {
        this.checkSubscriptionStatus(data2.subscription);
        this.subscriptionsList = data2.subscription;  // Store the subscriptions data
      })
    ).subscribe();

    this.subscriptions.add(subscription);
  }

  private checkSubscriptionStatus(subscriptions: any[]): void {
    for (const subscription of subscriptions) {
      if (subscription.subscription_category === "ea0e2c6a-a4ce-48a7-bf2c-c05c48d5497a") {
        this.isActive = 'Active';
        break;
      }
    }
  }
}
