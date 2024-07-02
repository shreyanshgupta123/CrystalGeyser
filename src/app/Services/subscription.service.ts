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
getActiveSubscriptionById(id:any):Observable<any>
{
  return this.http.get(`${baserUrl}activesubscription/${id}`)
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
  pauseSubscriptionbyId(id:any):Observable<any>
  {
    return this.http.post(`${baserUrl}pausedsubscription`,id)
  }
  cancelSubscription(data:any,id:any):Observable<any>
  {
    return this.http.put(`${baserUrl}subscription/${id}`,data)
  }
  activeSubscription():Observable<any>
  {
    return this.http.get(`${baserUrl}activesubscription`)
  }
  getPausedSubscription():Observable<any>
  {
    return this.http.get(`${baserUrl}pausedsubscription`)
  }
  addInAllSubscription( data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}allSubscriptions`, data);
  }
  getSubscriptionById(id:any):Observable<any>
  {
    return this.http.get(`${baserUrl}allsubscriptions/${id}`)
  }
  addPausedSubscription(data:any):Observable<any>
  {
    return this.http.post(`${baserUrl}pausedsubscription`,data)
  }
  getActiveSubscriptionByid(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}activeSubscription/${id}`)
  }
 DeleteActiveSubscription(id:any):Observable<any>
{

return this.http.delete(`${this.baseUrl}activesubscription/${id}`)
}
 UpdateAllSubscription(data: any, id: any): Observable<any> {
  return this.http.put(`${this.baseUrl}allsubscriptions/${id}`, data);
}

 getPausedSubscriptionById(id:any):Observable<any>{
  return this.http.get(`${this.baseUrl}pausedsubscription/${id}`)
}
addCanceledSubscription(data:any):Observable<any>{
  return this.http.post(`${this.baseUrl}cancelledsubscription`,data)
}
getCanceledSubscriptionById(id:any):Observable<any>{
  return this.http.get(`${this.baseUrl}cancelledsubscription/${id}`)
}
}



