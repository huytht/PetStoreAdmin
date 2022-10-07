import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/@model/product";
import { CommonService } from "src/app/@service/common.service";
import { AppStatusService } from '../../@service/app-status.service';
import { Category } from './../../@model/category';
import { FormControl } from '@angular/forms';
import { ProductService } from './../../@service/product.service';
import { Breed } from "src/app/@model/breed";
import { Origin } from "src/app/@model/origin";

@Component({
  selector: 'save-product-modal',
  templateUrl: './save-product.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class SaveProductModal {
  title: string;

  categoryList: Category[];
  breedList: Breed[];
  originList: Origin[];
  product: any;
  fileControl: FormControl = new FormControl('', []);
  selectedCategory: any;
  selectedBreed: any;
  selectedOrigins: any[];

  constructor(public dialogRef: MatDialogRef<SaveProductModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService, private toastr: ToastrService, private commonService: CommonService) {
    this.commonService.getCategoryList().subscribe(
      (response: any) => {
        this.categoryList = data.type === 'product' ? response.data.filter(x => !x.name.includes('Danh mục mèo') && !x.name.includes('Danh mục chó')) 
                                                    : data.typePet === 'cat' ? response.data.filter(x => x.name.includes('Danh mục mèo')) 
                                                    : response.data.filter(x => x.name.includes('Danh mục chó'));
        this.selectedCategory = this.data.method === "update" ? this.categoryList.find(x => x.id === this.product.category.id) : null;
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
    if (data.type !== 'product') {
      this.commonService.getBreedList().subscribe(
        (response: any) => {
          this.breedList = data.typePet === 'cat' ? response.data.filter(x => x.name.includes('Mèo')) : response.data.filter(x => x.name.includes('Chó'));
          this.selectedBreed = this.data.method === "update" ? this.breedList.find(x => x.id === this.product.breed.id) : null;
        }, (error) => {
          this.toastr.error(error.errorMessage);
        }
      );
      this.commonService.getOriginList().subscribe(
        (response: any) => {
          this.originList = response.data;
          this.selectedOrigins = this.data.method === "update" ? this.product.origins : null;
        }, (error) => {
          this.toastr.error(error.errorMessage);
        }
      );
    }
    
    this.product = data.method === "update" ? data.product : {};
  }

  confirmUpdate() {
    switch (this.data.type) {

      // case 'album':
      //   this.updateAlbum();
      //   break;
    }
  }

  createProduct() {
    this.product.category = this.selectedCategory;
    if (this.data.type === "pet") {
      this.product.breed = this.selectedBreed;
    }
    const formData = this.data.type === "pet" 
    ? this.productService.createPetFormData(this.product, this.fileControl.value, this.selectedOrigins) 
    : this.productService.createProductFormData(this.product, this.fileControl.value);
    this.productService.saveProduct(formData).subscribe(
      (response: any) => {
        this.toastr.success("Saved successfully");
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  updateProduct() {
    this.product.categoryId = this.selectedCategory.id;
    if (this.data.type === "pet") {
      this.product.breedId = this.selectedBreed.id;
      this.product.originIds = this.selectedOrigins.map(x => x.id);
    }
    const formData = this.data.type === "pet" 
    ? this.productService.createPetFormData(this.product, this.fileControl.value, this.selectedOrigins) 
    : this.productService.createProductFormData(this.product, this.fileControl.value);
    this.productService.updateProduct(this.data.product.id, formData).subscribe(
      (response: any) => {
        this.toastr.success("Updated successfully");
        this.dialogRef.close();
      }, (error) => {
        console.log(error)
        this.toastr.error(error.errorMessage);
      }
    );
  }

  saveProduct() {
    switch (this.data.method) {
      case 'create':
        this.createProduct();
        break;
      case 'update':
        this.updateProduct();
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  comparer(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.id === o2.id : o2 === o2;
  }
}