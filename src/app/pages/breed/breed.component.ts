import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Breed } from '../../@model/breed';
import { BreedService } from '../../@service/breed.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/@service/common.service';
import { DeleteModal } from '../../@modal/delete/delete.modal';
import { environment } from '../../../environments/environment';
import { SaveModal } from 'src/app/@modal/save-modal/save-modal';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.css']
})
export class BreedComponent implements OnInit {

  title = 'Breed';
  @ViewChild('breedTable') table: any;

  baseUrl = environment.apiUrl;

  breeds: Breed[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  breed: Breed;

  constructor(public dialog: MatDialog, private breedService: BreedService, private toastr: ToastrService, private commonService: CommonService) { }

  ngOnInit() {
    window.document.title = this.title;
    this.getBreedList();
  }

  openDeleteDialog(breedId: string) {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '300px',
      data: {
        type: 'breed',
        breedId: breedId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBreedList();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(SaveModal, {
      width: '300px',
      data: {
        type: 'breed',
        method: 'create',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBreedList();
    });
  }

  openUpdateDialog(breedData: Breed) {
    const dialogRef = this.dialog.open(SaveModal, {
      width: '300px',
      data: {
        type: 'breed',
        method: 'update',
        object: breedData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBreedList();
    });
  }

  getBreedList() {
    this.breedService.getBreeds().subscribe(
      (response: any) => {
        this.breeds = response.data;
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
