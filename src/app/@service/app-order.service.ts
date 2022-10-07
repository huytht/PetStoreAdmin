import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppOrderService extends BaseService{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  path: string = '/order';

  public getOrders(orderStatus: number): Observable<any> {
    return this.getRequest(`${this.path}?orderStatus=${orderStatus}`);
  }

  public confirmOrder(orderTrackingNumber: string): Observable<any> {
    return this.putRequest(`${this.path}/confirm?orderTrackingNumber=${orderTrackingNumber}`, {});
  }

  public deleteOrder(orderId: number): Observable<any> {
    return this.deleteRequest(`${this.path}?orderId=${orderId}`);
  }
}
