import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { UpdateStatusUserModal } from 'src/app/@modal/update-status-user/update-status-user.modal';
import { AppUserService } from './../../@service/app-user.service';
import { AppUser } from './../../@model/app-user';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ["user.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit{
  title = 'User';
  users: AppUser[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(private userService: AppUserService, private toastr: ToastrService, public dialog: MatDialog) {}

  ngOnInit(): void {
    window.document.title = this.title;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data;
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  exportUserDataToCSV() {
    this.userService.exportToCSV().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'user.csv';
        link.click();
      }, (error) => {
        // this.toastr.error("Error while exporting data to CSV");
        console.log(error);
      }
    );
  }

  getRole(roles: any) {
    let role = "";
    for (let i = 0; i < roles.length; i++) {
      role += roles[i].name + " ";
    }
    return role;
  }

  isAdmin(appRoles: any[]) {
    for (let i = 0; i < appRoles.length; i++) {
      if (appRoles[i].name === "ROLE_ADMIN") {
        return true;
      }
    }
    return false;
  }

  openUpdateStatusDialog(userId: number, isActive: boolean) {
    this.dialog.open(UpdateStatusUserModal, {
      width: '300px',
      data: { userId: userId, isActive: isActive }
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getUsers();
    });
  }
}
