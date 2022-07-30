import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { Category } from "../@model/category";

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

  getCategoryList(): Observable<Category[]> {
    return this.getRequest<Category[]>(`${this.path}/list/category`);
  }
}