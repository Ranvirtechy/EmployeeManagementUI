import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, LoginContext, Credentials } from '../core/authentication/authentication.service';
import { TfrHelper } from '../shared/helpers/tfr-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { TfrConstants } from '../shared/constants/tfr-constants';
 

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  @Input()
  insideOnModal = true;

  @Output()
  onLoggedIn: EventEmitter<any> = new EventEmitter<any>()

  showForgotPassword = false;

  loginForm: FormGroup;
  loginContext: LoginContext;
  forgotPasswordForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authenticationService: AuthenticationService, private tfrHelper: TfrHelper, private _router: Router, private tfrConstants: TfrConstants, private activatedRoute: ActivatedRoute) {
    this.loginForm = _fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['']
    });
    this.forgotPasswordForm = _fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() { }

  login() {
    //var context: LoginContext = { username: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value, remember: (this.loginForm.controls['remember'].value == undefined || this.loginForm.controls['remember'].value == '') ? false : this.loginForm.controls['remember'].value };

    var context: LoginContext = { id: this.loginForm.controls['id'].value, password: this.loginForm.controls['password'].value, remember: (this.loginForm.controls['remember'].value == undefined || this.loginForm.controls['remember'].value == '') ? false : this.loginForm.controls['remember'].value };

    if (context.id != undefined && context.id != '' && context.password != undefined && context.password != '') {
      this.tfrHelper.showSpinner();
      this._authenticationService.login(context).subscribe(
        credentials => this.isUserAuthenticated(credentials),
        err => this.getFailure(err),
        () => this.getAlways()
      );
    }

  }
  getReturnUrl(): string {
    return this.activatedRoute.snapshot.queryParams['returnUrl'] || 'dashboard';
  }
  getFailure(err) {
    setTimeout(function () { this.tfrHelper.tfrToaster('Username or password is incorrect', '', this.tfrConstants.tfrSweetAlertType.Error); }.bind(this), 1);
    this.tfrHelper.hideSpinner();
  }
  getAlways() {
    this.tfrHelper.hideSpinner();
  }
  isUserAuthenticated(credentials) {
    this.tfrHelper.hideSpinner();
    if (credentials != undefined && credentials != null && credentials._body != undefined && credentials._body != null) {
      var res = JSON.parse(credentials._body);
      var credential: Credentials = { token: res.Data, id: this.loginForm.controls['id'].value };

      //var credential: Credentials = { token: res.Data, username: this.loginForm.controls['username'].value };
      this._authenticationService.setCredentials(credential, (this.loginForm.controls['remember'].value == undefined || this.loginForm.controls['remember'].value == '') ? false : this.loginForm.controls['remember'].value);
      this._router.navigateByUrl(this.getReturnUrl());
    }
  }
}
