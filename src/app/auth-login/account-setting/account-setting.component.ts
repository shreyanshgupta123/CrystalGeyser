import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit, OnDestroy {
  user: any = {}; // Ensure user is initialized
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

                if (this.user && this.user.address && this.user.address.length > 0) {
                  console.log(this.user.address[0].country);
                } else {
                  console.error('User address array is empty or undefined.');
                }
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

  onSave(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.updateUserDetails(userId, this.user).subscribe(
        (response) => {
          console.log('User details updated successfully:', response);

        },
        (error) => {
          console.error('Error updating user details:', error);
          
        }
      );
    } else {
      console.error('No user ID found in localStorage.');
    }
  }
}
