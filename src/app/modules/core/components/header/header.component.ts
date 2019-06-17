import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
  //username: string=(this._authenticationService.credentials != undefined) ? this._authenticationService.credentials.username : '';
  id: string = (this._authenticationService.credentials != undefined) ? this._authenticationService.credentials.id : '';

constructor(private _authenticationService: AuthenticationService, private _router: Router) {
  //this.username = (this._authenticationService.credentials != undefined) ? this._authenticationService.credentials.username : '';
  this.id = (this._authenticationService.credentials != undefined) ? this._authenticationService.credentials.id : '';
}

ngOnInit() {
  //this.username = (this._authenticationService.credentials != undefined) ? this._authenticationService.credentials.username : '';
  this.id = (this._authenticationService.credentials != undefined) ? this._authenticationService.credentials.id : '';
}
logOut() {
  this._authenticationService.logout();
  this._router.navigateByUrl('/login');
}
}
