import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../Interface/products.models';
import { baserUrl } from '../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${baserUrl}products`;
private CategoryByid=`${baserUrl}productcategories`
  constructor(private httpClient: HttpClient) { }

  allProducts(): Observable<Product[]> { 
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getByCategoryId():Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(this.CategoryByid);
  }

}
