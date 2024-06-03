import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: any;
  totalAmount: any;
  allAlterAddress: any[] = [];
  addAlternateAddressForm!: FormGroup;
  isLoading = false;
  showForm = true;
  userId: string | null = '';

  constructor(private authService: AuthServiceService,
     private userService: UserService,
     private route:Router,
     private fb: FormBuilder) {}

  ngOnInit(): void {
    this.totalAmount = localStorage.getItem('TotalAmount');
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.userId = userId;
    } else {
    console.log("userId not found")
    }
    this.initForm();
    if (userId) {
      this.authService.getUserDetails(userId).subscribe(
        (data) => {
          this.user = data;
          console.log('User data:', this.user);
          if (this.user && this.user.address && this.user.address.length > 0) {
            this.allAlterAddress = this.user.address[0].alternateAddresses;
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('No user ID found in localStorage.');
    }
  }
  manageAddress()
  {
this.route.navigate(['manageAddress'])
  }
  initForm() {
    this.addAlternateAddressForm= this.fb.group({
      user_id: this.userId,
      name: ['', Validators.required],
      phone: ['', Validators.required],
      phone2: ['', Validators.required],
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

    if (this.addAlternateAddressForm.valid) {
      this.isLoading = true;
      this.showForm = false;
      console.log('Form is valid', this.addAlternateAddressForm.value);

      if (this.userId !== null) {
        this.authService.createAlternateAddress(this.addAlternateAddressForm.value).subscribe(
          result => {
            console.log('Server response', result);
            console.log('Registration successful', 'Success');
            this.isLoading = false;
            this.showForm = true;
          },
          error => {
            console.error('Registration failed', error);
            console.log('Registration failed. Please try again later.', 'Error');
            this.isLoading = false;
            this.showForm = true;
          }
        );
      } else {
        console.error('User ID is null');

      }
    } else {
      console.warn('Form is invalid');
      console.log('Please fill in all required fields.', 'Warning');
    }
  }

}
