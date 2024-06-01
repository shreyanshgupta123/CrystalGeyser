import { Component } from '@angular/core';
import { SubscriptionService } from '../../Services/subscription.service';


@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.css'
})
export class MySubscriptionsComponent {
subData:any
  constructor(private sub :SubscriptionService) {
    this.subData = this.sub.getSubscription().subscribe(
      data=>{
console.log(data)
      }
    )
  }

}
