import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Origin } from '../@model/origin';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  path: string = '/product';

  public getProducts(): Observable<any> {
    return this.getRequest(`${this.path}/list/product`);
  }

  public getCats(): Observable<any> {
    return this.getRequest(`${this.path}/list/cat`);
  }

  public getDogs(): Observable<any> {
    return this.getRequest(`${this.path}/list/dog`);
  }

  public createProductFormData(product: any, images: File[]): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('amount', product.amount.toString());
    formData.append('categoryId', product.category.id.toString());
    images.forEach(image => {
      formData.append("imageFiles", image);
    });

    return formData;
  }

  public createPetFormData(product: any, images: File[], origins: Origin[]): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('amount', product.amount.toString());
    formData.append('gender', product.gender);
    formData.append('age', product.age);
    formData.append('categoryId', product.category.id.toString());
    formData.append('breedId', product.breed.id.toString());
    origins.forEach(origin => {
      formData.append("originIds", origin.id.toString());
    });
    images.forEach(image => {
      formData.append("imageFiles", image);
    });

    return formData;
  }

  public saveProduct(formData: FormData): Observable<any> {
    return this.postRequest(`${this.path}`, formData);
  }

  public updateProduct(productId: number, productUpdate: any): Observable<any> {
    return this.putRequest(`${this.path}?product-id=${productId}`, productUpdate);
  }

  public deleteProduct(productId: number): Observable<any> {
    return this.deleteRequest(`${this.path}?product-id=${productId}`);
  }

  public updateInventory(productId: number, amount: number): Observable<any> {
    return this.putRequest(`${this.path}/amount?product-id=${productId}&amount=${amount}`, {});
  }
}
