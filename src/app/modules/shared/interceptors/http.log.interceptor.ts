import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TfrConstants } from '../constants/tfr-constants';
import { TfrHelper } from '../helpers/tfr-helper';
import { ApiRequest } from '@app/models/common/api.request.model';

@Injectable()
export class HttpLogInterceptor implements HttpInterceptor {

    private apiRequestEndPoint: string;
    constructor(public _http: HttpClient, public tfrConstants: TfrConstants, public tfrHelper: TfrHelper) {
        this.apiRequestEndPoint = this.tfrConstants.internalApiRoot + this.tfrConstants.requestLogRoutePrefix + 'create';
    }

    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // don't log the logRequest.
        const isLogRequest = request.url.includes(this.tfrConstants.requestLogRoutePrefix);
        if (isLogRequest) {
            return next.handle(request);
        }

        const isOperationApiRequest = request.url.includes(this.tfrConstants.internalApiRoot);
        // don't log another http request other than the api.
        if (!isOperationApiRequest) {
            return next.handle(request);
        }

        const logRequest = new ApiRequest();
        logRequest.RequestId = this.tfrHelper.generateGUID();
        logRequest.HttpVerb = request.method;
        logRequest.Url = request.urlWithParams;
        logRequest.Data = request.body;

        const headerKey = this.tfrConstants.requestIdHeaderKey;
        const clonedReq = request.clone({
            headers: request.headers.set(headerKey, logRequest.RequestId)
        });

        return this._http.post<any>(this.apiRequestEndPoint, logRequest, { headers: clonedReq.clone().headers })
            .pipe(switchMap(response => {
                return next.handle(clonedReq);
            }), catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    return next.handle(clonedReq);
                }
                return throwError(err);
            }));
    }
}
