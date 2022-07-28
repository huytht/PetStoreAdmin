import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateAppStatus } from '../@model/update-app-status';
import { AppUtilService } from './app-util.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppStatusService extends BaseService {
  path: string = '/app-status';

  constructor(httpClient: HttpClient, private appUtilService: AppUtilService) {
    super(httpClient);
  }

  createUpdateAppStatusFormData(updateAppStatus: UpdateAppStatus): FormData {
    const formData = new FormData();
    formData.append('entityId', updateAppStatus.entityId.toString());
    formData.append('appStatusId', updateAppStatus.appStatusId.toString());
    return formData;
  }

  updateStatus(model: string, formData: any): Observable<UpdateAppStatus> {
    return this.appUtilService.update<UpdateAppStatus>(`${this.path}/${model}`, formData);
  }
}
