import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { OurSourcesComponent } from './Components/our-sources/our-sources.component';
import { SustainabilityComponent } from './Components/sustainability/sustainability.component';
import { OurPromisesComponent } from './Components/our-promises/our-promises.component';
import { CareersComponent } from './Components/careers/careers.component';
import { ShowselectedProductComponent } from './Components/showselected-product/showselected-product.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'products', component:ProductsComponent},
  {path:'products/allproducts', component:AllProductsComponent},
  {path:'our-sources', component:OurSourcesComponent},
  {path:'sustainability', component:SustainabilityComponent},
  {path:'our-promises', component:OurPromisesComponent},
  {path:'careers', component:CareersComponent},
  {path:'selecteditem', component:ShowselectedProductComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
