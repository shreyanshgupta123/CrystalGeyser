import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private authservice: AuthServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      phone2: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      image: [''],
      userId:[''],
      country: ['', Validators.required],
      states: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      landmark: ['', Validators.required],
      houseNumber: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted');  // Debug statement

    if (this.registrationForm.valid) {
      console.log('Form is valid', this.registrationForm.value);  // Debug statement
      this.authservice.userLogin(this.registrationForm.value).subscribe(
        result => {
          console.log('Server response', result);
          this.toastr.success(result.message, 'Success');
        },
        error => {
          console.error('Login failed', error);
          this.toastr.error('Login failed. Please try again later.', 'Error');
        }
      );
    } else {
      console.warn('Form is invalid');
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }
}
