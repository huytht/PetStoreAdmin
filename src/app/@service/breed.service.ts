import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppUtilService } from './app-util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService extends BaseService{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  path: string = '/breed';

  public addBreed(formData: FormData): Observable<any> {
    return this.postRequest<any>(`${this.path}`, formData);
  }

  public getBreeds(): Observable<any> {
    return this.getRequest<any>(`${this.path}`);
  }

  public getBreed(id: number): Observable<any> {
    return this.getRequest<any>(`${this.path}/${id}`);
  }

  public updateBreed(id: number, formData: FormData): Observable<any> {
    return this.putRequest<any>(`${this.path}/${id}`, formData);
  }

  public deleteBreed(id: number): Observable<any> {
    return this.deleteRequest<any>(`${this.path}/${id}`);
  }
}
