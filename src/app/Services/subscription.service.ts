import { Injectable } from '@angular/core';
import { baserUrl } from '../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addSubscription(subscriptionData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}activesubscription`, subscriptionData, { headers });
  }

  subscriptionById(id:any):Observable<any>{
    return this.http.get(`${baserUrl}subscription/${id}`)
  }
  pauseSubscription(data:any):Observable<any>
  {
    return this.http.post(`${baserUrl}pausedsubscription`,data)
  }
  cancelSubscription(data:any,id:any):Observable<any>
  {
    return this.http.put(`${baserUrl}subscription/${id}`,data)
  }
  activeSubscription():Observable<any>
  {
    return this.http.get(`${baserUrl}activesubscription`)
  }
}


