import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { Observable } from 'rxjs';
import { DashBoardDataModel } from '../../models/dashBoardData.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  apiRoutePrefixForDashboard = 'dashboard/';
  apiEndpoint;
  dataTableGetDashBoardOrdersCardsDetailsRoute = this.apiRoutePrefixForDashboard + 'getordersdatafordashboard';
  dataTableGetDashBoardRestaurantCardsDetailsRoute = this.apiRoutePrefixForDashboard + 'getrestaurantsdatafordashboard';
  constructor(private _http: HttpClient, private tfrConstants: TfrConstants) {
    this.apiRoutePrefixForDashboard = this.tfrConstants.internalApiRoot + this.apiRoutePrefixForDashboard;


  }
  getDashboardCardsInfo(): Observable<DashBoardDataModel> {
    return this._http.get<DashBoardDataModel>(this.apiRoutePrefixForDashboard + `getdashboardcardsinfo`);
  }
}
