import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from '../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Cart } from '../Interface/cart.models';

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


}
