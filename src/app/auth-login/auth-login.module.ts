import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayOnlineComponent } from './pay-online/pay-online.component';

export function initApp(router: Router, platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        router.navigateByUrl('/userlogin');
      }
    }
  };
}
@NgModule({
  declarations: [
    AccountSettingComponent,
    ManageAddressComponent,
    UserSettingComponent,
    MyOrderComponent,
    MySubscriptionsComponent,
    MyWishlistComponent,
    PayOnlineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Router],
      multi: true
    }
  ],
  exports: [
    AccountSettingComponent,
    ManageAddressComponent,
    UserSettingComponent,
    MyOrderComponent,
    MySubscriptionsComponent,
    MyWishlistComponent
  ]
})
export class AuthLoginModule { }
