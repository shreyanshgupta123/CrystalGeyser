import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css'] // Corrected the property name to styleUrls
})
export class UserSettingComponent implements OnInit, OnDestroy {
  activeComponent: string = '';
  user: any;
  private tokenSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    // Initialize and load token if available
    this.tokenSubscription = this.authService.getToken().subscribe(
      (token) => {
        if (token) {
          const userId = localStorage.getItem('userId');
          if (userId) {
            this.fetchUserDetails(userId);
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

  setActiveComponent(componentName: string): void {
    this.activeComponent = componentName;
    if (componentName === 'Manage Address') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.fetchUserDetails(userId);
      }
    }
  }

  private fetchUserDetails(userId: string): void {
    this.authService.getUserDetails(userId).subscribe(
      (data) => {
        this.user = data;
        localStorage.setItem('userDetail', JSON.stringify(this.user));
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
