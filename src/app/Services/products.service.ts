import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interface/products.models';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://crystelgeyserbackendapi.onrender.com/api/products';

  constructor(private httpClient: HttpClient) { }

  allProducts(): Observable<Product[]> {  // Specify the return type
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
}
