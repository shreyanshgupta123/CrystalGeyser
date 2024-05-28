import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit, OnDestroy {
  user: any;
  private tokenSubscription: Subscription | null = null;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.tokenSubscription = this.authService.getToken().subscribe(
      (token) => {
        if (token) {
          const userId = localStorage.getItem('userId');
          if (userId) {
            this.authService.getUserDetails(userId).subscribe(
              (data) => {
                this.user = data;
                localStorage.setItem('userDetail', JSON.stringify(this.user));
                console.log(data);
              },
              (error) => {
                console.error('Error fetching user details:', error);
              }
            );
          } else {
            console.error('No user ID found in localStorage.');
          }
        } else {
          console.error('No token found in session storage.');
        }
      },
      (error) => {
        console.error('Error retrieving token:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const userId = localStorage.getItem('userId');
    if (userId && this.user) {
      this.authService.updateUserDetails(userId, this.user).subscribe(
        (response) => {
          console.log('User details updated successfully:', response);
          
        },
        (error) => {
          console.error('Error updating user details:', error);

        }
      );
    } else {
      console.error('User ID or user data is invalid.');
    }
  }
}
