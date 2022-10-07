import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppUserService } from './../../@service/app-user.service';
import { AuthenticationService } from './../../@service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  title = 'Đăng nhập';
  loginFormGroup: FormGroup;
  showLoading: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,private el: ElementRef, private router: Router, private authenticationService: AuthenticationService, private toastr: ToastrService, private appUserService: AppUserService) { }

  ngOnInit(): void {
    window.document.title = this.title;
    this.authenticationService.logOut();
    this.loginFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(user: any): void {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
    } else {
      this.showLoading = true;
      this.subscriptions.push(
        this.authenticationService.login(user)
          .pipe(finalize(() => (this.showLoading = false)))
          .subscribe((response: any) => {
            this.loginFormGroup.get('username').setValue('');
            this.loginFormGroup.get('password').setValue('');
            this.loginFormGroup.get('username').setErrors(null);
            this.loginFormGroup.get('password').setErrors(null);
            // focus form control username
            this.el.nativeElement.querySelector('#username').focus();
            this.authenticationService.saveToken(response.data.token.accessToken);
            if (this.authenticationService.isLoggedIn()) {
              this.appUserService.getUserInfo(response.data.id).subscribe((userInfo: any) => {
                this.authenticationService.addUserInfoToLocalCache(userInfo.data);
                this.router.navigate(['/']).then(r => { })
              });
            }
          }, (error) => this.toastr.error(error.errorMessage))
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get username(): AbstractControl {
    return this.loginFormGroup.get('username');
  }

  get password(): AbstractControl {
    return this.loginFormGroup.get('password');
  }

}
