import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { OurSourcesComponent } from './Components/our-sources/our-sources.component';
import { SustainabilityComponent } from './Components/sustainability/sustainability.component';
import { OurPromisesComponent } from './Components/our-promises/our-promises.component';
import { CareersComponent } from './Components/careers/careers.component';
import { CartComponent } from './Components/cart/cart.component';
import { ShowselectedProductComponent } from './Components/showselected-product/showselected-product.component';
import { RelatedProductsComponent } from './Components/related-products/related-products.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthLoginModule } from './auth-login/auth-login.module';
import { DistilledWaterComponent } from './Components/CategorywiseProducts/distilled-water/distilled-water.component';
import { MineralWaterComponent } from './Components/CategorywiseProducts/mineral-water/mineral-water.component';
import { SpringWaterComponent } from './Components/CategorywiseProducts/spring-water/spring-water.component';
import { AlkalineWaterComponent } from './Components/CategorywiseProducts/alkaline-water/alkaline-water.component';
import { IonizedWaterComponent } from './Components/CategorywiseProducts/ionized-water/ionized-water.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    AllProductsComponent,
    NavbarComponent,
    OurSourcesComponent,
    SustainabilityComponent,
    OurPromisesComponent,
    CareersComponent,
    CartComponent,
    ShowselectedProductComponent,
    RelatedProductsComponent,
    CheckoutComponent,
    UserLoginComponent,
    DistilledWaterComponent,
    MineralWaterComponent,
    SpringWaterComponent,
    AlkalineWaterComponent,
    IonizedWaterComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthLoginModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    ToastrService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
