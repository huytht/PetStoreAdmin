import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/@model/product";
import { CommonService } from "src/app/@service/common.service";
import { ProductService } from '../../@service/product.service';

@Component({
  selector: 'add-inventory-modal',
  templateUrl: './add-inventory.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class AddInventoryModal {
  title: string;
  product: Product = new Product();

  constructor(public dialogRef: MatDialogRef<AddInventoryModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService, private toastr: ToastrService) {
    
  }

  addToInventory() {
    this.productService.updateInventory(this.data.productId, this.product.amount).subscribe(
      (response: any) => {
        this.toastr.success("Updated successfully");
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