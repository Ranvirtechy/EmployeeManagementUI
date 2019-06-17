import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROOT_URL } from '../../models/config/config';
import { Registration } from '../../models/registration/Registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private httpclient: HttpClient, private route: ActivatedRoute, ) { }

  RegistrationDetailById(RegistrationId: string): any {
    //  debugger;
    return this.httpclient.get<any>(ROOT_URL + `Registration/get/${RegistrationId}`);
  }
  //this is for getting all role data from the server.
  getAllRoleDataForDropDown() {
    //debugger;
    return this.httpclient.get<any>(ROOT_URL + `Role/get`);
  }


  saveRegistrationData(registration: Registration, isCreateMode: boolean): any {
    debugger;
    return isCreateMode
      ? this.httpclient.post<any>(ROOT_URL + `Registration/create`, registration)
      : this.httpclient.post<any>(ROOT_URL + `Registration/update`, registration);
  }

  deleteRegistrationRecord(deleteRegistrationId: boolean): any {
    //debugger;
    return this.httpclient.get<any>(ROOT_URL + `Registration/delete/${deleteRegistrationId}`);

  }

}

