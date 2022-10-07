import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "src/app/@service/common.service";
import { AppStatusService } from './../../@service/app-status.service';

@Component({
  selector: 'update-app-status-modal',
  templateUrl: './update-app-status.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class UpdateAppStatusModal {
  title: string;

  appStatusList: any[];
  appStatusId: number;

  constructor(public dialogRef: MatDialogRef<UpdateAppStatusModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private appStatusService: AppStatusService, private toastr: ToastrService, private commonService: CommonService) {
    this.commonService.getOrderStatusList().subscribe(
      (response: any) => {
        this.appStatusList = response.data;
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
    this.appStatusId = this.data.appStatusId;
  }

  confirmUpdate() {
    switch (this.data.type) {
      case 'track':
        this.updateTrack();
        break;

      case 'album':
        this.updateAlbum();
        break;
    }
  }

  updateTrack() {
    const formData = this.appStatusService.createUpdateAppStatusFormData({ entityId: this.data.trackId, appStatusId: this.appStatusId });
    this.appStatusService.updateStatus('track', formData).subscribe(
      (response: any) => {
        this.toastr.success("Updated successfully");
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  updateAlbum() {
    const formData = this.appStatusService.createUpdateAppStatusFormData({ entityId: this.data.albumId, appStatusId: this.appStatusId });
    this.appStatusService.updateStatus('album', formData).subscribe(
      (response: any) => {
        this.toastr.success("Updated successfully");
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}