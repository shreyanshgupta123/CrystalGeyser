import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  role: string = '';
  isLoading = false;
  showForm: boolean = true;
  userNameforId: any;

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

    // Subscribe to form changes to update userNameforId
    this.loginForm.get('username')!.valueChanges.subscribe(value => {
      this.userNameforId = value;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.showForm = false;


      this.userNameforId = this.loginForm.get('username')!.value;
localStorage.setItem('usercred',this.userNameforId)
      this.auth.Login(this.loginForm.value).subscribe(
        (result: any) => {
          if (result && result.token) {
            sessionStorage.setItem('authToken', result.token);
            console.log('Token stored in session storage:', result.token);

            this.role = result.role || 'Admin';
            localStorage.setItem('role', this.role);

            this.router.navigate(['/home']).then(() => {
              window.location.reload();
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
}
