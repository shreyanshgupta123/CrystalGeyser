import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { SubscriptionService } from '../../Services/subscription.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { response } from 'express';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit {
  ActivesubscriptionsList: any[] = [];
  PausedsubscriptionsList: any[] = [];
  ActivesubscriptionsLists: any[] = [];
  isActive: string | undefined;
  private subscriptions: Subscription = new Subscription();
  userId:any
  toastVisible = false;
  toastVisible2 = false;

  constructor(
    private subService: SubscriptionService,
    private authService: AuthServiceService,

  ) {}

  ngOnInit(): void {

this.getActiveSubscription();
this.getPausedSubscription();
this.getActiveUser();

  }

  getActiveUser(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.authService.getUserDetails(this.userId).subscribe(data => {
        console.log(data);
        this.ActivesubscriptionsList = data.subscription;
        console.log(this.ActivesubscriptionsList);
        localStorage.setItem('ActiveSubscription', JSON.stringify(this.ActivesubscriptionsList));
        this.ActivesubscriptionsList.forEach(element => {
          if (element.active_subscription_id) {
            console.log(element);
          }
        });
      });
    }
  }


  pausedSubscription(id:string):void
  {
this.authService.getUserDetails(this.userId).subscribe(
  data=>{

this. PausedsubscriptionsList=data.subscription
console.log(this.PausedsubscriptionsList)

})
  }
  cancelOrder(id:any):void
  {

    this.subService.subscriptionById(id).subscribe(
      data=>{

    const cancelOrderData={
      price:data.price,
      subscription_type:data.subscription_type,
      purchasedDate:data.purchased_date
    }

    this.subService.cancelSubscription(cancelOrderData,id).subscribe(
      response=>{

      }
    )
      }
    )
      }
      getActiveSubscription():void{
        this.subService.activeSubscription().subscribe(data=>{

        this.ActivesubscriptionsList=data
        })
      }

      getPausedSubscription():void{
this.subService.getPausedSubscription().subscribe(
  data=>{

this.PausedsubscriptionsList=data
  }
)

      }

}
