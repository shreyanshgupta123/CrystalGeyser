import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'] // corrected styleUrl to styleUrls
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService
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
      this.auth.Login(this.loginForm.value).subscribe(
        (result: any) => {

          if (result && result.token) {
            sessionStorage.setItem('authToken', result.token);
            console.log('Token stored in session storage:', result.token);
          }
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
