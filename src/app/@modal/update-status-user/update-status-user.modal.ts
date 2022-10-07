import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AppUserService } from './../../@service/app-user.service';

@Component({
  selector: 'update-status-user-modal',
  templateUrl: './update-status-user.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class UpdateStatusUserModal {
  enable: boolean;

  constructor(public dialogRef: MatDialogRef<UpdateStatusUserModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private appUserService: AppUserService, private toastr: ToastrService) {
    this.data.isActive ? this.enable = false : this.enable = true;
  }

  confirmUpdate() {
    this.appUserService.updateStatus({ userId: this.data.userId, isActive: this.data.isActive }).subscribe(
      (response: any) => {
        this.toastr.success(response.data);
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