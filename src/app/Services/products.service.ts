import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../Interface/products.models';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://crystelgeyserbackendapi.onrender.com/api/products';
private CategoryByid='https://crystelgeyserbackendapi.onrender.com/api/productcategories'
  constructor(private httpClient: HttpClient) { }

  allProducts(): Observable<Product[]> {  // Specify the return type
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getByCategoryId():Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(this.CategoryByid);
  }
}
