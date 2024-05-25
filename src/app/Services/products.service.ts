import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category, Product, wishList } from '../Interface/products.models';
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
  wishList(data:any):Observable<wishList[]>
  {
    return this.httpClient.post<any>(`${this.apiUrl}wishlist`, data).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
