import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './@guard/authentication.guard';
import { RoleGuard } from './@guard/role.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { AppConstant } from './@constant/app-constant';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { roles: [`${AppConstant.APP_ROLE_ADMIN}`] }, children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'order', component: OrderComponent },
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
