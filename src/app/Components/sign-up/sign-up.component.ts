import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private authservice: AuthServiceService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      phone2: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDate: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      landMark: new FormControl(''),
      houseNumber: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authservice.userLogin(this.formGroup.value).subscribe(
        result => {
          console.log(result);
          alert(result.message);
        },
        error => {
          console.error('Login failed', error);
          alert('Login failed. Please try again later.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
