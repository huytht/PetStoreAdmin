import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Category } from '../../@model/category';
import { CategoryService } from '../../@service/category.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/@service/common.service';
import { DeleteModal } from '../../@modal/delete/delete.modal';
import { environment } from '../../../environments/environment';
import { SaveModal } from 'src/app/@modal/save-modal/save-modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title = 'Category';
  @ViewChild('categoryTable') table: any;

  baseUrl = environment.apiUrl;

  categories: Category[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  category: Category;

  constructor(public dialog: MatDialog, private categoryService: CategoryService, private toastr: ToastrService, private commonService: CommonService) { }

  ngOnInit() {
    window.document.title = this.title;
    this.getCategoryList();
  }

  openDeleteDialog(categoryId: string) {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '300px',
      data: {
        type: 'category',
        categoryId: categoryId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategoryList();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(SaveModal, {
      width: '300px',
      data: {
        type: 'category',
        method: 'create',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategoryList();
    });
  }

  openUpdateDialog(categoryData: Category) {
    const dialogRef = this.dialog.open(SaveModal, {
      width: '300px',
      data: {
        type: 'category',
        method: 'update',
        object: categoryData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategoryList();
    });
  }

  getCategoryList() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
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
