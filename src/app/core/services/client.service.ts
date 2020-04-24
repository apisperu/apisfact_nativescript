import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  getString,
  setString,
} from 'tns-core-modules/application-settings/application-settings';

@Injectable()
export class ClientService {
  constructor(private _http: HttpClient) {}

  getList(): Observable<any> {
    const clientList = this.getClientList();
    return of(clientList);
  }

  getByDocNumner(numDoc): Observable<any> {
    const clientList = this.getClientList();
    return of(clientList.find((item) => item.numDoc === numDoc));
  }

  save(data): Observable<any> {
    const clientList = this.getClientList();
    clientList.push(data);
    this.saveClientList(clientList);
    return of({});
  }

  update(data): Observable<any> {
    const clientList = this.getClientList();
    const newClientList = clientList.map((item) => {
      if (item.numDoc === data.numDoc) {
        item = data;
      }
      return {
        ...item,
      };
    });
    this.saveClientList(newClientList);
    return of({});
  }

  delete(numDoc): Observable<any> {
    const clientList = this.getClientList();
    const newClientList = clientList.filter((item) => {
      return item.numDoc !== numDoc;
    });
    this.saveClientList(newClientList);
    return of({});
  }

  private getClientList(): any[] {
    const clientList = getString('clientList');
    return clientList ? JSON.parse(clientList) : [];
  }

  private saveClientList(clientList) {
    setString('clientList', JSON.stringify(clientList));
  }
}
