import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from '../enviroment/enviroment';
import { Observable, catchError, throwError } from 'rxjs';
import { AddCart, Cart, DeleteCart } from '../Interface/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http:HttpClient) { }

  private apiUrl=`${baserUrl}cart`

  getCart():Observable<Cart[]>
  {
return this.http.get<Cart[]>(this.apiUrl);
  }
  addToCart(data: { productid: string, userid: string, quantity: number }): Observable<AddCart[]> {
    return this.http.post<AddCart[]>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  updateCartItemQuantity(cartItem: { id: string; quantity: number; userid: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartItem.id}`, { quantity: cartItem.quantity, userid: cartItem.userid });
  }
   deleteCartItem(cartItemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartItemId}`);
  }
private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError('Something went wrong; please try again later.');
}
}
