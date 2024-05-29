import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: any;

  totalAmount:any

  constructor(private authService: AuthServiceService, private userService: UserService) {}

  ngOnInit(): void {
   this.totalAmount= localStorage.getItem('TotalAmount')
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(userId).subscribe(
        (data) => {
          this.user = data;
          console.log('User data:', this.user);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('No user ID found in localStorage.');
    }
  }
}
