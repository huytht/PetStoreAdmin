import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { AddInventoryModal } from 'src/app/@modal/add-inventory/add-inventory';
import { DeleteModal } from 'src/app/@modal/delete/delete.modal';
import { SaveProductModal } from 'src/app/@modal/save-product/save-product';
import { Product } from 'src/app/@model/product';
import { ProductService } from 'src/app/@service/product.service';
import { environment } from 'src/environments/environment';
import { Origin } from './../../@model/origin';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  title = 'Product';
  @ViewChild('productTable') table: any;

  baseUrl = environment.apiUrl;

  products: Product[];
  statusList: any[];
  statusId = 0;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  product: Product;

  constructor(public dialog: MatDialog, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    window.document.title = this.title;
    this.getCatList();
  }

  openDeleteDialog(productId: number) {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '300px',
      data: {
        type: 'product',
        productId: productId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCatList();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(SaveProductModal, {
      width: '300px',
      data: {
        type: 'pet',
        typePet: 'cat',
        method: 'create',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCatList();
    });
  }

  openUpdateDialog(productData: Product) {
    const dialogRef = this.dialog.open(SaveProductModal, {
      width: '300px',
      data: {
        type: 'pet',
        method: 'update',
        product: productData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCatList();
    });
  }

  openUpdateAmountDialog(productId: number) {
    const dialogRef = this.dialog.open(AddInventoryModal, {
      width: '300px',
      data: {
        type: 'product',
        productId: productId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCatList();
    });
  }

  getCatList() {
    this.productService.getCats().subscribe(
      (response: any) => {
        this.products = response.data;
      }, (error) => {
        this.toastr.error(error.error.errorMessage);
      }
    );
  }

  getOrigins(origins: Origin[]) {
    return origins.map(origin => origin.name).join(', ');
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

}
