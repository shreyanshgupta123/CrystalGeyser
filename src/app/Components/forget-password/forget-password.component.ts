import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  passwordsDoNotMatch = false;
  tokenForPassword: string | null = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.tokenForPassword = sessionStorage.getItem('forgetpasswordToken');
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;
      if (password === confirmPassword) {
        this.auth.resetPassword({ token: this.tokenForPassword!, newPassword: password }).subscribe(
          response => {
            console.log("Password changed successfully");
            this.router.navigate(['userlogin']);
          },
          error => {
            console.error("Password change failed", error);
          }
        );
      } else {
        this.passwordsDoNotMatch = true;
      }
    }
  }
}
