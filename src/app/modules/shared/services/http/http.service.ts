import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models/user.model';
import { UserListResponse } from '@app/models/userListResponse.model';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TfrHttpService {
    // apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
    apiEndPoint = 'http://dev.tfrnewapi.com/api/User/GetUsers';
    _tfrConstants: TfrConstants;
    constructor(private _http: HttpClient, private tfrConstants: TfrConstants) {
        this._tfrConstants = tfrConstants;
    }

    getUsers(): Observable<UserListResponse> {
        return this._http.post<UserListResponse>(this.apiEndPoint, null);
    }

    getUserById(id): Observable<User> {
        return this._http.post<User>(this.apiEndPoint, id);
    }


    post(methodRoute, data, options) {
        return this._http.post(this._tfrConstants.internalApiRoot + methodRoute, data, options);
    }

    get(methodRoute, data, options) {
        return this._http.get(this._tfrConstants.internalApiRoot + methodRoute, options);
    }
}

