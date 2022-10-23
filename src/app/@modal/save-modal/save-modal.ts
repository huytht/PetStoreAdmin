import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "src/app/@service/common.service";
import { Category } from '../../@model/category';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../@service/product.service';
import { Breed } from "src/app/@model/breed";
import { Origin } from "src/app/@model/origin";
import { CategoryService } from './../../@service/category.service';
import { BreedService } from './../../@service/breed.service';
import { OriginService } from './../../@service/origin.service';

@Component({
  selector: 'save-modal',
  templateUrl: './save-modal.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class SaveModal {
  title: string;
  object: any;

  constructor(public dialogRef: MatDialogRef<SaveModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService, private breedService: BreedService, private originService: OriginService, private toastr: ToastrService) {
    
    this.object = data.method === "update" ? data.object : {};
  }

  confirmUpdate() {
    switch (this.data.type) {

      // case 'album':
      //   this.updateAlbum();
      //   break;
    }
  }

  createObject() {
    const formData = new FormData();
    formData.append("name", this.object.name);
    console.log(this.object.name)
    switch (this.data.type) {
      case 'category': 
          this.categoryService.addCategory(formData).subscribe(
            (response: any) => {
              this.toastr.success("Saved successfully");
              this.dialogRef.close();
            }, (error) => {
              this.toastr.error(error.errorMessage);
            }
          )
          break;
      case 'breed': 
          this.breedService.addBreed(formData).subscribe(
            (response: any) => {
              this.toastr.success("Saved successfully");
              this.dialogRef.close();
            }, (error) => {
              this.toastr.error(error.errorMessage);
            }
          )
          break;
      case 'origin': 
          this.originService.addOrigin(formData).subscribe(
            (response: any) => {
              this.toastr.success("Saved successfully");
              this.dialogRef.close();
            }, (error) => {
              this.toastr.error(error.errorMessage);
            }
          )
          break;
    }
    
  }

  updateObject() {
    const formData = new FormData();
    formData.append("name", this.object.name);
    switch (this.data.type) {
      case 'category': 
          this.categoryService.updateCategory(this.data.object.id, formData).subscribe(
            (response: any) => {
              this.toastr.success("Update successfully");
              this.dialogRef.close();
            }, (error) => {
              this.toastr.error(error.errorMessage);
            }
          )
          break;
      case 'breed': 
          this.breedService.updateBreed(this.data.object.id, formData).subscribe(
            (response: any) => {
              this.toastr.success("Update successfully");
              this.dialogRef.close();
            }, (error) => {
              this.toastr.error(error.errorMessage);
            }
          )
          break;
      case 'origin': 
          this.originService.updateOrigin(this.data.object.id, formData).subscribe(
            (response: any) => {
              this.toastr.success("Update successfully");
              this.dialogRef.close();
            }, (error) => {
              this.toastr.error(error.errorMessage);
            }
          )
          break;
    }
  }

  saveObject() {
    switch (this.data.method) {
      case 'create':
        this.createObject();
        break;
      case 'update':
        this.updateObject();
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