import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class BillingService {
  constructor(private _http: HttpClient) {}

  sendInvoice(data): Observable<any> {
    return this._http.post(Endpoint.invoice(), data);
  }
}
