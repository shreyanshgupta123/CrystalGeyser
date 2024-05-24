import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'] // corrected styleUrl to styleUrls
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  role: string = '';
  isLoading=false;
  showForm: boolean = true;
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading=true;
      this.showForm = false;
      this.auth.Login(this.loginForm.value).subscribe(
        (result: any) => {
          if (result && result.token) {
            sessionStorage.setItem('authToken', result.token);
            console.log('Token stored in session storage:', result.token);
            this.isLoading=false;
            this.showForm = true;
            this.role = result.role || 'Admin'; // Use the role from result, default to 'Admin' if not provided
            localStorage.setItem('role', this.role);

            // Navigate to home after storing the token and role, then reload the page
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
