import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { DeleteModal } from "src/app/@modal/delete/delete.modal";
import { UpdateAppStatusModal } from "src/app/@modal/update-app-status/update-app-status.modal";
import { Order } from "src/app/@model/order";
import { AppOrderService } from "src/app/@service/app-order.service";
import { CommonService } from "src/app/@service/common.service";
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
  title = 'Order';
  @ViewChild('orderTable') table: any;
  @ViewChild('orderItemTable') orderItemTable: any;

  baseUrl = environment.apiUrl;

  orders: Order[];
  statusList: any[];
  statusId = 0;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  order: Order;

  constructor(public dialog: MatDialog, private orderService: AppOrderService, private toastr: ToastrService, private commonService: CommonService) { }

  ngOnInit() {
    window.document.title = this.title;
    this.commonService.getOrderStatusList().subscribe(
      (response: any) => {
        this.statusList = [{ id: 0, name: 'Tất cả' , description: '' }, ...response.data];
      }, (error) => {
        this.toastr.error(error.errorMessage);
    });
    this.getOrderByStatus();
  }

  openDeleteDialog(orderId: number) {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '300px',
      data: {
        type: 'order',
        orderId: orderId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOrderByStatus();
    });
  }

  // openUpdateStatusDialog(orderTrackingNumber: string, appStatusId: number) {
  //   const dialogRef = this.dialog.open(UpdateAppStatusModal, {
  //     width: '300px',
  //     data: {
  //       type: 'order',
  //       orderTrackingNumber: orderTrackingNumber,
  //       appStatusId: appStatusId
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getOrderByStatus();
  //   });
  // }

  orderConfirm(orderTrackingNumber: string) {
    this.orderService.confirmOrder(orderTrackingNumber).subscribe(
      (response: any) => {
        this.toastr.success("Xác nhận đơn hàng thành công");
        this.getOrderByStatus();
      }, (error) => {
        this.toastr.error(error.errorMessage);
      }
    );
  }

  getOrderByStatus() {
    var observe = this.orderService.getOrders(this.statusId);
    observe.subscribe(
      (response: any) => {
        this.orders = response.data;
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