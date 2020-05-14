import { Injectable } from '@angular/core';

import { Endpoint } from '~/app/core/utils/endpoint';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IBillingRequest } from '~/app/billing/models/billing.request';
import { IBillingResponse } from '~/app/billing/models/billing.response';
import { IBilling } from '~/app/billing/models/billing-extended.model';
import { ICompanyDataState } from '../models/company-data-state.model';
import {
  getString,
  setString,
} from 'tns-core-modules/application-settings/application-settings';
import { getFile } from 'tns-core-modules/http/http';
import { path, File } from 'tns-core-modules/file-system/file-system';
import { AppStateService } from './app-state.service';

declare var android;
const BASE_URL = 'https://facturacion.apisperu.com/api/v1/';

@Injectable()
export class BillingService {
  constructor(private _http: HttpClient, private appState: AppStateService) {}

  sendInvoice(data: IBillingRequest): Observable<IBillingResponse> {
    return this._http.post<IBillingResponse>(Endpoint.invoice(), data);
  }

  generatePdf(data: any): Observable<HttpResponse<any>> {
    return this._http.post(Endpoint.invoicePdf(), data, {
      observe: 'response',
      responseType: 'text',
    });
  }

  generatePdf2(data: IBillingRequest): Promise<File> {
    let downloadedFilePath = path.join(
      android.os.Environment.getExternalStoragePublicDirectory(
        android.os.Environment.DIRECTORY_DOWNLOADS
      ).getAbsolutePath(),
      'test.pdf'
    );
    const authToken = this.appState.get('accessToken');

    const permissions = require('nativescript-permissions');

    return permissions
      .requestPermission(
        android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
        "I need these permissions because I'm cool"
      )
      .then(() => {
        return getFile({
          url: BASE_URL + Endpoint.invoicePdf(),
          method: 'POST',
          content: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }).then((downloadedFile) => {
          const xfile = File.fromPath(downloadedFilePath);
          downloadedFile.readText().then((content) => {
            xfile.writeText(content).then(() => {
              console.log('Succsess!');
              xfile.readText().then((content) => {
                console.log('saved content: ' + content);
              });
            });
          });
        });
      });
  }

  generateXml(data: IBillingRequest): Observable<HttpResponse<string>> {
    return this._http.post(Endpoint.invoiceXml(), data, {
      observe: 'response',
      responseType: 'text',
    });
  }

  storeBilling(companyRuc: string, data: IBilling): Observable<any> {
    const billingList = this.getBillingList(companyRuc);
    billingList.push(data);
    this.saveBillingList(companyRuc, billingList);
    return of({});
  }

  getList(companyRuc: string): Observable<IBilling[]> {
    const billingList = this.getBillingList(companyRuc);
    return of(billingList);
  }

  private getBillingList(companyRuc: string): IBilling[] {
    const companyDataStateList: ICompanyDataState[] = getString(
      'companyDataStateList'
    )
      ? JSON.parse(getString('companyDataStateList'))
      : [];

    const index = companyDataStateList.findIndex(
      (item) => item.company.ruc === companyRuc
    );

    return index !== -1 ? companyDataStateList[index].billingList : [];
  }

  private saveBillingList(companyRuc: string, billingList: IBilling[]) {
    const companyDataStateList: ICompanyDataState[] = getString(
      'companyDataStateList'
    )
      ? JSON.parse(getString('companyDataStateList'))
      : [];

    const index = companyDataStateList.findIndex(
      (item) => item.company.ruc === companyRuc
    );

    if (index !== -1) {
      companyDataStateList[index].billingList = billingList;
      setString('companyDataStateList', JSON.stringify(companyDataStateList));
    }
  }
}
