import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ROOT_URL } from '../../models/config/config'

@Injectable({
  providedIn: 'root'
})
export class EmployeeroleService {

  constructor(private httpclient: HttpClient, private route: ActivatedRoute, ) { }

  RoleDetailById(RoleId: string): any {
    //  debugger;
    return this.httpclient.get<any>(ROOT_URL + `Role/get/${RoleId}`);
  }

  saveRoleData(role: any, isCreateMode: boolean): any {
    debugger;
    let data = { "Id": role.id, "Name": role.name };
    return isCreateMode
      ? this.httpclient.post<any>(ROOT_URL + `Role/create`, data)
      : this.httpclient.post<any>(ROOT_URL + `Role/update`, data);
  }

  deleteRoleRecord(deleteRoleId: boolean): any {
    //debugger;
    return this.httpclient.get<any>(ROOT_URL + `Role/delete/${deleteRoleId}`);

  }

}
