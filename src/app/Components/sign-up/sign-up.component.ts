import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registrationForm!: FormGroup;
  isLoading = false;
  showForm = true;

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
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      phone2: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      image: [''],
      country: ['', Validators.required],
      states: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      landmark: ['', Validators.required],
      housenumber: ['', Validators.required],
      pincode: ['', Validators.required]      
    });
  }

  onSubmit() {
    console.log('Form submitted');

    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.showForm = false;
      console.log('Form is valid', this.registrationForm.value);
      this.authservice.userLogin(this.registrationForm.value).subscribe(
        result => {
          console.log('Server response', result);
          this.toastr.success('Registration successful', 'Success');
          this.isLoading = false;
          this.showForm = true;
        },
        error => {
          console.error('Registration failed', error);
          this.toastr.error('Registration failed. Please try again later.', 'Error');
          this.isLoading = false;
          this.showForm = true;
        }
      );
    } else {
      console.warn('Form is invalid');
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }
}
