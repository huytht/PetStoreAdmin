import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Origin } from '../../@model/origin';
import { OriginService } from '../../@service/origin.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/@service/common.service';
import { DeleteModal } from '../../@modal/delete/delete.modal';
import { environment } from '../../../environments/environment';
import { SaveModal } from 'src/app/@modal/save-modal/save-modal';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {

  title = 'Origin';
  @ViewChild('originTable') table: any;

  baseUrl = environment.apiUrl;

  origins: Origin[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  origin: Origin;

  constructor(public dialog: MatDialog, private originService: OriginService, private toastr: ToastrService, private commonService: CommonService) { }

  ngOnInit() {
    window.document.title = this.title;
    this.getOriginList();
  }

  openDeleteDialog(originId: string) {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '300px',
      data: {
        type: 'origin',
        originId: originId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOriginList();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(SaveModal, {
      width: '300px',
      data: {
        type: 'origin',
        method: 'create',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOriginList();
    });
  }

  openUpdateDialog(originData: Origin) {
    const dialogRef = this.dialog.open(SaveModal, {
      width: '300px',
      data: {
        type: 'origin',
        method: 'update',
        object: originData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOriginList();
    });
  }

  getOriginList() {
    this.originService.getOrigins().subscribe(
      (response: any) => {
        this.origins = response.data;
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

}
