import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IBillingRequest } from '~/app/billing/models/billing.request';
import { IBillingResponse } from '~/app/billing/models/billing.response';

@Injectable()
export class BillingService {
  constructor(private _http: HttpClient) {}

  sendInvoice(data: IBillingRequest): Observable<IBillingResponse> {
    return this._http.post<IBillingResponse>(Endpoint.invoice(), data);
  }
}
