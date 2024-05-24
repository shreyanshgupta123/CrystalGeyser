import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  constructor(private auth:UserService)
{
this.auth.getUserDetails().subscribe(
  (data)=>
    {
      console.log(data)
      
    }
)
}



}
