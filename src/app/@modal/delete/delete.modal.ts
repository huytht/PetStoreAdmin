import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AppOrderService } from "src/app/@service/app-order.service";
import { BreedService } from "src/app/@service/breed.service";
import { CategoryService } from "src/app/@service/category.service";
import { OriginService } from "src/app/@service/origin.service";
import { ProductService } from './../../@service/product.service';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class DeleteModal {

  constructor(public dialogRef: MatDialogRef<DeleteModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService, private orderService: AppOrderService, private productService: ProductService, private categoryService: CategoryService, private breedService: BreedService, private originService: OriginService) { }

  confirmDelete() {
    switch (this.data.type) {
      case 'order':
        this.removeOrder();
        break;
      case 'product':
        this.removeProduct();
        break;
      case 'category':
        this.removeCategory();
        break;
      case 'breed':
        this.removeBreed();
        break;
      case 'origin':
        this.removeOrigin();
        break;
      
    }
  }

  removeOrder() {
    this.orderService.deleteOrder(this.data.orderId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa đơn hàng thành công');
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  removeProduct() {
    this.productService.deleteProduct(this.data.productId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa sản phẩm thành công');
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  removeCategory() {
    this.categoryService.deleteCategory(this.data.categoryId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa thành công');
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  removeBreed() {
    this.breedService.deleteBreed(this.data.breedId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa thành công');
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  removeOrigin() {
    this.originService.deleteOrigin(this.data.originId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa thành công');
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