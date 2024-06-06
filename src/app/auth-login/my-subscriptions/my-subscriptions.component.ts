import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SubscriptionService } from '../../Services/subscription.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { response } from 'express';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit {
  subscriptionsList: any[] = [];
  isActive: string | undefined;
  private subscriptions: Subscription = new Subscription();
  userId:any

  constructor(
    private subService: SubscriptionService,
    private authService: AuthServiceService,

  ) {}

  ngOnInit(): void {

    this.userId=localStorage.getItem('userId')
    this.authService.getUserDetails(this.userId).subscribe(
      data=>{

        this.subscriptionsList=data.subscription

      }
    )
  }
  findSubscription(id:string):void
  {
this.subService.subscriptionById(id).subscribe(
  data=>{
console.log(data)
const pauseData={
  from_date:data.from_date,
  expired_date:data.expired_date,
  user_id:this.userId,
  subscription_id:id
}
this.subService.pauseSubscription(pauseData).subscribe(
  response=>{
console.log(response)
  }
)
  }
)
  }


}
