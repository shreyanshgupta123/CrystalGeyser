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
}

interface SubscriptionModel3{
  price: string,
  user_id:string,
  purchased_date: string,
  reason: string
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
  cancellationReason: string = '';
  currentSubscriptionId: string | null = null;

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
              });
            } else if (element.cancelled_subscription_id) {
              // Handle cancelled subscriptions if necessary
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
            this.subService.Updateactivesubscription(fornull, sub).subscribe(
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
            data=>{
          console.log('order cancelled response-',data);
          })
          const dialog: any = document.getElementById('my_modal_3');
          dialog.close();
        }
      );
    }
  }
}
