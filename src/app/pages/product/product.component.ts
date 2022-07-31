import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Product } from './../../@model/product';
import { ProductService } from './../../@service/product.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/@service/common.service';
import { DeleteModal } from './../../@modal/delete/delete.modal';
import { environment } from './../../../environments/environment';
import { SaveProductModal } from './../../@modal/save-product/save-product';
import { AddInventoryModal } from 'src/app/@modal/add-inventory/add-inventory';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

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

  constructor(public dialog: MatDialog, private productService: ProductService, private toastr: ToastrService, private commonService: CommonService) { }

  ngOnInit() {
    window.document.title = this.title;
    this.getProductList();
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
      this.getProductList();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(SaveProductModal, {
      width: '300px',
      data: {
        type: 'product',
        method: 'create',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductList();
    });
  }

  openUpdateDialog(productData: Product) {
    const dialogRef = this.dialog.open(SaveProductModal, {
      width: '300px',
      data: {
        type: 'product',
        method: 'update',
        product: productData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductList();
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
      this.getProductList();
    });
  }

  getProductList() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.data;
      }, (error) => {
        this.toastr.error(error.error.errorMessage);
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
