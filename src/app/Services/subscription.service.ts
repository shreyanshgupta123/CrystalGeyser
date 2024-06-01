import { Injectable } from '@angular/core';
import { baserUrl } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = `${baserUrl}`;
  constructor(private http: HttpClient) { }

  getSubscription():Observable<any>
  {
    return this.http.get(`${baserUrl}Subscription`)
  }
}
