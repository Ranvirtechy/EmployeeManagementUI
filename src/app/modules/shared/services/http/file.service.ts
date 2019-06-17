import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileService {
   
  apiRoutePrefix = 'file/';
  apiEndpoint;
  constructor(private _http: HttpClient, private tfrConstants: TfrConstants) {
    this.apiEndpoint = this.tfrConstants.internalApiRoot + this.apiRoutePrefix;
  }

   

  saveFile(file): Observable<any> {
    return this._http.post<any>(this.apiEndpoint + `SaveFile`, file)
  }
}

