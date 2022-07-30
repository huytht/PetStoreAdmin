import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AppOrderService } from "src/app/@service/app-order.service";
import { ProductService } from './../../@service/product.service';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class DeleteModal {

  constructor(public dialogRef: MatDialogRef<DeleteModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService, private orderService: AppOrderService, private productService: ProductService) { }

  confirmDelete() {
    switch (this.data.type) {
      case 'order':
        this.removeOrder();
        break;
      case 'product':
        this.removeProduct();
        break;
    }
  }

  removeOrder() {
    this.orderService.deleteOrder(this.data.orderId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa đơn hàng thành công');
        this.dialogRef.close();
      }, (error) => {
        this.toastr.error(error.error.errorMessage);
      }
    );
  }

  removeProduct() {
    this.productService.deleteProduct(this.data.productId).subscribe(
      (response: any) => {
        this.toastr.success('Xóa sản phẩm thành công');
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