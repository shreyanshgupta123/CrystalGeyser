import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  validity_duration: {
    days: number;
  };
}

interface SubscriptionModel2 {
  expired_date: string;
  from_date: string;
  paused_days: string;
  id: string;
  price: string;
  subscription_id: string;
}

interface SubscriptionModel3{
  cancelled_date:string;
  price:string;
  purchased_date:string;
  reason:string;

}

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit, OnDestroy {
  ActivesubscriptionsList: SubscriptionModel[] = [];
  PausedsubscriptionsList: SubscriptionModel2[] = [];
  CancelledsubscriptionList:SubscriptionModel3[]=[];
  private subscriptions: Subscription = new Subscription();
  userId: string | null = null;
  toastVisible = false;
  toastVisible2 = false;
  cancellationReason: string = '';
  currentSubscriptionId: string | null = null;
  allsubid:any

  constructor(
    private subService: SubscriptionService,
    private authService: AuthServiceService
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
                  console.log(this.ActivesubscriptionsList);
                },
                error => {
                  console.error('Error fetching active subscription:', error);
                }
              );
            } else if (element.paused_subscription_id && !element.active_subscription_id) {
              console.log(element.paused_subscription_id);
              this.subService.getPausedSubscriptionById(element.paused_subscription_id).subscribe(data => {
                console.log(data);
                this.PausedsubscriptionsList.push(data);
                this.allsubid=data.all_subscription_id
              });
            } else if (element.cancelled_subscription_id) {
              this.subService.getCanceledSubscriptionById(element.cancelled_subscription_id).subscribe(
                canceled=>{
             this.CancelledsubscriptionList.push(canceled)
             console.log('this is canceled list ',this.CancelledsubscriptionList)
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

  pauseSubscription(id: string, sub: string, priceOfItem: any): void {
    this.subService.getActiveSubscriptionByid(id).subscribe(
      data => {

        const createPausedSubscription = {
          from_date: this.formatDate(data.purchased_date),
          expired_date: this.formatDate(data.expired_date),
          user_id: this.userId,
          subscription_id: id,
          is_paused: true,
          price: priceOfItem
        };
        this.subService.addPausedSubscription(createPausedSubscription).subscribe(
          data => {
            const fornull = {
              active_subscription_id: null,
              cancelled_subscription_id: null,
              paused_subscription_id: data.id,
              user_id: this.userId
            };
            this.subService.UpdateAllSubscription(fornull, sub).subscribe(
              data => {
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

  openCancelDialog(id: string): void {
    this.currentSubscriptionId = id;
    const dialog: any = document.getElementById('my_modal_3');
    dialog.showModal();
  }

  submitCancellation(): void {
    if (this.currentSubscriptionId) {
      this.subService.getPausedSubscriptionById(this.currentSubscriptionId).subscribe(
        data => {
          const createCanceledSubscription = {
            price: data.price,
            user_id: data.user_id,
            purchased_date: data.from_date,
            reason: this.cancellationReason
          };
          console.log(createCanceledSubscription);
          this.subService.addCanceledSubscription(createCanceledSubscription).subscribe(
            data2=>{
              console.log("This is canceled id",data2.id);
              const canceled={
                active_subscription_id:null ,
              cancelled_subscription_id: data2.id,
              paused_subscription_id: null ,
              user_id: this.userId
              }

console.log('this is response for update')
           this.subService.UpdateAllSubscription(canceled,this.allsubid).subscribe(
             data3=>{
            console.log('data canceled and add in allsubscription',data3)
           })
          })
          const dialog: any = document.getElementById('my_modal_3');
          dialog.close();
        }
      );
    }
  }
}
