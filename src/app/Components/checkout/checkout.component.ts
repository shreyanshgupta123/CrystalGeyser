import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

export interface UpdateUserAddress {
  name:string;
  country: string;
  states: string;
  city: string;
  street: string;
  landmark: string;
  housenumber: string;
  pincode: string;
  phone: string;
  phone2: string;
}

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
  UpdateDetails: any = {};

  constructor(
    private authService: AuthServiceService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.totalAmount = localStorage.getItem('TotalAmount');
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.userId = userId;
    } else {
      console.log("userId not found");
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

  deleteAddress(id: any): void {
    console.log('Attempting to delete address with ID:', id);
    this.authService.deleteAlternateAddress(id).subscribe(
      (response) => {
        console.log('Address deleted successfully:', response);
        console.log('Deleted address ID:', id);
        this.allAlterAddress = this.allAlterAddress.filter(address => address.id !== id);
      },
      (error) => {
        console.error('Error deleting address:', error);
      }
    );
  }

  manageAddress() {
    this.router.navigate(['manageAddress']);
  }

  initForm() {
    this.addAlternateAddressForm = this.fb.group({
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

  updateAddress(id: string) {
    this.authService.getAlternateAddressById(id).subscribe(
      result => {
        console.log('Server response', result);
        this.UpdateDetails = result;

        localStorage.setItem('updateitem', result.id);
      }
    );
  }

  updateAddressDetails() {
    const addressId = this.UpdateDetails.id;
    if (!this.UpdateDetails || !addressId) {
      console.error('Invalid UpdateDetails object or missing ID');
      return;
    }

    const updatedAddress: UpdateUserAddress = {
      name: this.UpdateDetails.name,
      country: this.UpdateDetails.country,
      states: this.UpdateDetails.states,
      city: this.UpdateDetails.city,
      street: this.UpdateDetails.street,
      landmark: this.UpdateDetails.landmark,
      housenumber: this.UpdateDetails.housenumber,
      pincode: this.UpdateDetails.pincode,
      phone: this.UpdateDetails.phone,
      phone2: this.UpdateDetails.phone2
    };

    this.isLoading = true;
    console.log(addressId)
    this.authService.updateAlternateAddress(addressId, updatedAddress)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          console.log('Address updated successfully', response);
        },
        error => {
          console.error('Error updating address', error);
        }
      );
  }
  selectAddress(id:string)
  {
console.log(id)
  }
}
