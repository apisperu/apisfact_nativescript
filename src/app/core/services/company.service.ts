import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(private _http: HttpClient) {}

  getList(): Observable<any> {
    return this._http.get(Endpoint.company());
  }

  save(data): Observable<any> {
    console.log({ data });
    return this._http.post(Endpoint.company(), data);
  }
}
