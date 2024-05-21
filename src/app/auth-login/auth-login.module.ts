import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';



@NgModule({
  declarations: [
    AccountSettingComponent,
    ManageAddressComponent,
    UserSettingComponent,
    MyOrderComponent,
    MySubscriptionsComponent,
    MyWishlistComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthLoginModule { }
