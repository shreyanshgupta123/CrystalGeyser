import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit, OnDestroy {
  user: any = {};
  isLoading = false;
  private tokenSubscription: Subscription | null = null;
  toastVisible = false;

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
                this.isLoading = false;
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
      console.log('User data before update:');
      console.log('First Name:', this.user.first_name);
      console.log('Middle Name:', this.user.middle_name);
      console.log('Last Name:', this.user.last_name);


      this.authService.updateUserDetails(userId, this.user).subscribe(
        (response) => {
          console.log('User details updated successfully:', response);
          this.isLoading = true;
          this.toastVisible = true;

       
          timer(500).pipe(take(1)).subscribe(() => {
            this.toastVisible = false;
          });
        },
        (error) => {
          console.error('Error updating user details:', error);

          this.isLoading = true;
          this.toastVisible = true;

          timer(1000).pipe(take(1)).subscribe(() => {
            this.toastVisible = false;
          });
        }
      );
    } else {
      console.error('No user ID found in localStorage.');
    }
  }



}
