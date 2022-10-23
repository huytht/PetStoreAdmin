import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OriginService extends BaseService{
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  path: string = '/origin';

  public addOrigin(formData: FormData): Observable<any> {
    return this.postRequest<any>(`${this.path}`, formData);
  }

  public getOrigins(): Observable<any> {
    return this.getRequest<any>(`${this.path}`);
  }

  public getOrigin(id: number): Observable<any> {
    return this.getRequest<any>(`${this.path}/${id}`);
  }

  public updateOrigin(id: number, formData: FormData): Observable<any> {
    return this.putRequest<any>(`${this.path}/${id}`, formData);
  }

  public deleteOrigin(id: number): Observable<any> {
    return this.deleteRequest<any>(`${this.path}/${id}`);
  }
}
