import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private _http: HttpClient) {}

  auth(data: any): Observable<any> {
    return this._http.post(Endpoint.login(), data);
  }

  logout(): Observable<any> {
    // TODO: Implement this
    return of();
  }
}
