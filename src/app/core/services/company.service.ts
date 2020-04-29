import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICompany } from '~/app/company/models/company.model';
import {
  setString,
  getString,
} from 'tns-core-modules/application-settings/application-settings';

@Injectable()
export class CompanyService {
  constructor(private _http: HttpClient) {}

  getList(): Observable<any> {
    return this._http.get(Endpoint.company());
  }

  save(data): Observable<any> {
    return this._http.post(Endpoint.company(), data);
  }

  storeActiveCompany(data: ICompany): Observable<any> {
    setString('activeCompany', JSON.stringify(data));
    return of({});
  }

  getActiveCompany(): Observable<ICompany> {
    const company = getString('activeCompany');
    return company ? of(JSON.parse(company)) : of({});
  }
}
