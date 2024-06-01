import { Component } from '@angular/core';
import { SubscriptionService } from '../../Services/subscription.service';
import { AuthServiceService } from '../../Services/auth-service.service';


@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.css'
})
export class MySubscriptionsComponent {
subData:any
subscription:any
isActive:any
  constructor(
    private sub :SubscriptionService,
    private auth:AuthServiceService) {
    this.subData = this.sub.getSubscription().subscribe(
      data=>{
data.forEach((element:any) => {
  this.auth.getUserDetails(element.user_id).subscribe(data2=>{

this.subscription=data2.subscription
this.subscription.forEach((element3:any) => {
  if(element3.subscription_category=="ea0e2c6a-a4ce-48a7-bf2c-c05c48d5497a")
    {
      console.log(this.isActive)
this.isActive='Active'

    }
    })
  });

});
      }
    )
  }

}
