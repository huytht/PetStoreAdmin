import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from '../../pages/login/login.component';
import { ComponentsModule } from './../../components/components.module';
import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
  imports: [
  CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule
  ],
  declarations: [
    AuthLayoutComponent,
    LoginComponent
  ]
})
export class AuthLayoutModule { }
