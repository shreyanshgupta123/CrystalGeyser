import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category, Product, wishList } from '../Interface/products.models';
import { baserUrl } from '../enviroment/enviroment';
import { DeleteCart } from '../Interface/cart.models';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiUrl = `${baserUrl}products`;
private CategoryByid=`${baserUrl}productcategories`
private orderbyidcurrent=`${baserUrl}currentorders`
private orderbyidcancelled=`${baserUrl}cancelledorders`
private orderbyDelivered=`${baserUrl}deliveredorders`
private baseurl=`${baserUrl}`
  constructor(private httpClient: HttpClient) { }

  allProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
  getProductById(orderId:string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }
  getByCategoryId():Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(this.CategoryByid);
  }
  wishList(data:any):Observable<wishList[]>
  {
    return this.httpClient.post<any>(`${this.baseurl}wishlist`, data).pipe(
      catchError(this.handleError)
    );
  }
  getWishList():Observable<any>
  {
    return this.httpClient.get<any>(`${this.baseurl}wishlist`).pipe(
      catchError(this.handleError)
    );
  }



  OrderByIdCurrent(orderId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.orderbyidcurrent}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }
  OrderByListCurrent(): Observable<any> {
    return this.httpClient.get<any>(`${this.orderbyidcurrent}`).pipe(
      catchError(this.handleError)
    );
  }



  OrderByIdCancelled(orderId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.orderbyidcancelled}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }
  OrderByListCancelled(): Observable<any> {
    return this.httpClient.get<any>(`${this.orderbyidcancelled}`).pipe(
      catchError(this.handleError)
    );
  }



  OrderByListDelivered(): Observable<any> {
    return this.httpClient.get<any>(`${this.orderbyDelivered}`).pipe(
      catchError(this.handleError)
    );
  }
  OrderByIdDelivered(orderId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.orderbyDelivered}/${orderId}`).pipe(
      catchError(this.handleError)
    );
  }

  searchProducts(data: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/search/${data}`).pipe(
      catchError(this.handleError)
    );
  }




  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
