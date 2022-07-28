import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RoleGuard } from './@guard/role.guard';
import { AuthInterceptor } from './@interceptors/auth.interceptor';
import { AuthenticationGuard } from './@guard/authentication.guard';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { ToastrModule } from 'ngx-toastr';
import { AppUtilService } from './@service/app-util.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminLayoutModule,
    AuthLayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    })
  ],
  providers: [
    AuthenticationGuard,
    RoleGuard,
    AppUtilService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
