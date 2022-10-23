import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService{
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  path: string = '/category';

  public addCategory(formData: FormData): Observable<any> {
    return this.postRequest<any>(`${this.path}`, formData);
  }

  public getCategories(): Observable<any[]> {
    return this.getRequest<any[]>(`${this.path}`);
  }

  public getCategory(id: number): Observable<any> {
    return this.getRequest<any>(`${this.path}/${id}`);
  }

  public updateCategory(id: number, formData: FormData): Observable<any> {
    return this.putRequest<any>(`${this.path}/${id}`, formData);
  }

  public deleteCategory(id: number): Observable<any> {
    return this.deleteRequest<any>(`${this.path}/${id}`);
  }
}
