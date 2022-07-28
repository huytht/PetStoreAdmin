import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export abstract class CommonService extends BaseService {
  path: string = "/common";

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getOrderStatusList(): Observable<any[]> {
    return this.getRequest<any[]>(`${this.path}/list/order-status`);
  }
}