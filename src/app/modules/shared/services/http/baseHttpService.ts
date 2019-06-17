import { ResponseBase } from '@app/models/base/ResponseBase';
import { Injectable } from '@angular/core';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export abstract class BaseHttpService<T> {
    public apiEndpoint: string;
    public apiRoutePrefix: string;
    public dataTableRoute: string;
    constructor(routePrefix: string, public _http: HttpClient, public tfrConstants: TfrConstants) {
        this.apiRoutePrefix = routePrefix + (routePrefix.endsWith('/') ? '' : '/');
        this.apiEndpoint = this.tfrConstants.internalApiRoot + this.apiRoutePrefix;
        this.dataTableRoute = this.apiRoutePrefix + 'get';
    }

    getById(id: number | string): Observable<ResponseBase<T>> {
        return this._http.get<ResponseBase<T>>(this.apiEndpoint + `get/${id}`);
    }

    getList(listOfRequest: any): Observable<ListResponse<T>> {
        return this._http.post<ListResponse<T>>(this.apiEndpoint + `get`, listOfRequest);
    }

    save(data: T, isCreate: boolean): Observable<ResponseBase<T>> {
        return isCreate
            ? this._http.post<ResponseBase<T>>(this.apiEndpoint + `create`, data)
            : this._http.post<ResponseBase<T>>(this.apiEndpoint + `update`, data);
    }

    delete(id: number | string): Observable<ResponseBase<T>> {
        return this._http.delete<ResponseBase<T>>(this.apiEndpoint + id);
    }
}
