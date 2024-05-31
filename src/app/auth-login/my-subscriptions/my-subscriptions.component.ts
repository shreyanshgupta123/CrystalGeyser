import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.css'
})
export class MySubscriptionsComponent {
subData:any
  constructor(private auth :AuthServiceService) {
    this.auth.getSubscriptionDetails().subscribe(data=>{
      console.log(data);
this.subData=data
data.forEach((element:any) => {
console.log(element.subscription_price
);

});
    })
   }

}
