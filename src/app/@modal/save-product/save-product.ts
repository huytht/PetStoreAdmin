import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/@model/product";
import { CommonService } from "src/app/@service/common.service";
import { AppStatusService } from '../../@service/app-status.service';
import { Category } from './../../@model/category';
import { FormControl } from '@angular/forms';
import { ProductService } from './../../@service/product.service';

@Component({
  selector: 'save-product-modal',
  templateUrl: './save-product.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class SaveProductModal {
  title: string;

  categoryList: Category[];
  product: Product = new Product();
  fileControl: FormControl = new FormControl('', []);

  constructor(public dialogRef: MatDialogRef<SaveProductModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService, private toastr: ToastrService, private commonService: CommonService) {
    this.commonService.getCategoryList().subscribe(
      (response: any) => {
        this.categoryList = response.data;
      }, (error) => {
        this.toastr.error(error.error.errorMessage);
      }
    );
    // this.appStatusId = this.data.appStatusId;
  }

  confirmUpdate() {
    switch (this.data.type) {

      // case 'album':
      //   this.updateAlbum();
      //   break;
    }
  }

  testFile() {
    console.log(this.fileControl);
  }

  saveProduct() {
    const formData = this.productService.createProductFormData(this.product, this.fileControl.value);
    this.productService.saveProduct(formData).subscribe(
      (response: any) => {
        this.toastr.success("Saved successfully");
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.error.errorMessage);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}