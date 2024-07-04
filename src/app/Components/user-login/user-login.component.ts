import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';

export interface Email {
  email: string;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showForm = true;
  isLogIn = false;
  presentEmailAddress: string = '';
  userId: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  openForgotPasswordModal() {
    // Implement logic to open forgot password modal here if needed
    // Example: document.getElementById('my_modal_5')?.showModal();
  }

  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      this.isLoading = true;
      this.showForm = false;
      this.auth.Login(this.loginForm.value).subscribe(
        (result: any) => {
          if (result && result.token) {
            sessionStorage.setItem('authToken', result.token);
            console.log('Token stored in session storage:', result.token);
            this.isLoading = false;
            this.showForm = true;

            if (result.userId) {
              localStorage.setItem('userId', result.userId);
              console.log('User ID stored in local storage:', result.userId);
            }
            this.isLogIn = true;
            timer(800).pipe(take(1)).subscribe(() => {
              this.isLogIn = false;
              this.router.navigate(['/home']).then(() => {
                localStorage.setItem('role','Admin')
                window.location.reload();
              });
            });
          }
        },
        error => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.showForm = true;
        }
      );
    }
  }

  forgetPasswordEmail() {
    this.auth.getAllUsers().subscribe(data => {
      data.forEach((element: any) => {
        if (element.email === this.presentEmailAddress) {
          console.log(element.id);
          this.userId = element.id;
          this.auth.getUserDetails(this.userId).subscribe(
            data => {
              if (this.presentEmailAddress === data.email) {
                const useremail: Email = {
                  email: this.presentEmailAddress
                };
                this.auth.forgotEmail(useremail).subscribe(
                  response => {
                    console.log(response);

                    const token = response.token;
                    sessionStorage.setItem('forgetpasswordToken', token);
                    this.router.navigate(['forgetPassword']);
                  },
                  error => {
                    console.error('Error sending forgot password email:', error);
                  }
                );
              }
            },
            error => {
              console.error('Error getting user details:', error);
            }
          );
        }
      });
    });
  }
}
