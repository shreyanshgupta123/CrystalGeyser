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
    RelatedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
