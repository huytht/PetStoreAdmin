import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { AdminLayoutComponent } from "./admin-layout.component";
import { ComponentsModule } from "../../components/components.module";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";

import { DeleteModal } from './../../@modal/delete/delete.modal';
import { UpdateAppStatusModal } from './../../@modal/update-app-status/update-app-status.modal';
import { UpdateStatusUserModal } from './../../@modal/update-status-user/update-status-user.modal';
import { OrderComponent } from './../../pages/order/order.component';
import { DogComponent } from "src/app/pages/dog/dog.component";
import { CatComponent } from "src/app/pages/cat/cat.component";
import { ProductComponent } from "src/app/pages/product/product.component";
import { SaveProductModal } from "src/app/@modal/save-product/save-product";
import { NgxMatFileInputModule } from '@angular-material-components/file-input'; 
import { AddInventoryModal } from './../../@modal/add-inventory/add-inventory';

@NgModule({
  imports: [
CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxMatFileInputModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'Total', // Footer total message
        selectedMessage: 'Selected' // Footer selected message
      }
    })
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserComponent,
    OrderComponent,
    ProductComponent,
    CatComponent,
    DogComponent,
    SaveProductModal,
    AddInventoryModal,
    DeleteModal,
    UpdateAppStatusModal,
    UpdateStatusUserModal,
  ]
})
export class AdminLayoutModule { }
