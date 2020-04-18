import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable()
export class LoginService {
  constructor(
    private _http: HttpClient,
    private _appStateService: AppStateService
  ) {}

  auth(data: any): Observable<any> {
    return this._http.post(Endpoint.login(), data);
  }

  logout(): Observable<any> {
    this._appStateService.reset();
    return of();
  }

  isLogged() {
    const token = this._appStateService.get('accessToken');
    return !!token;
  }
}
