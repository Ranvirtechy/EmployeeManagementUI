import { Observable, of } from 'rxjs';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    //username: 'test',
    id:'1234',
    token: '123'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      //username: context.username,
      id: context.id,
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
