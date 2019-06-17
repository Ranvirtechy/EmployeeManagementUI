import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TfrConstants } from '@app/modules/shared/constants/tfr-constants';
import { Http } from '@angular/http';
import { ROOT_URL } from '../../../models/config/config';

export interface Credentials {
  // Customize received credentials here
  //username: string;
  id: string;
  token: string;
}

export interface LoginContext {
  //username: string;
  id: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  apiRoutePrefixForAccount = 'account/';
  apiEndpointForAccount;
  constructor(private tfrConstants: TfrConstants, private _http: Http) {
    this.apiEndpointForAccount = this.tfrConstants.internalApiRoot + this.apiRoutePrefixForAccount;
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    // Replace by proper authentication call
    // return this._http.post(this.apiEndpointForAccount + `login`, context);
    debugger;
    return this._http.post(ROOT_URL + `login`, context);

  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  public setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
