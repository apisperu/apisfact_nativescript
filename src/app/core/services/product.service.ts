import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  getString,
  setString,
} from 'tns-core-modules/application-settings/application-settings';

@Injectable()
export class ProductService {
  constructor(private _http: HttpClient) {}

  getList(): Observable<any> {
    const productList = this.getProductList();
    return of(productList);
  }

  save(data): Observable<any> {
    console.log({ data });
    const productList = this.getProductList();
    productList.push(data);
    this.saveProductList(productList);
    return of({});
  }

  update(data): Observable<any> {
    const productList = this.getProductList();
    const newProductList = productList.map((item) => {
      if (item.codProducto === data.codProducto) {
        item = data;
      }
      return {
        ...item,
      };
    });
    this.saveProductList(newProductList);
    return of({});
  }

  delete(codProducto): Observable<any> {
    const productList = this.getProductList();
    const newProductList = productList.filter((item) => {
      return item.codProducto !== codProducto;
    });
    this.saveProductList(newProductList);
    return of({});
  }

  private getProductList(): any[] {
    return JSON.parse(getString('productList'));
  }

  private saveProductList(productList) {
    setString('productList', JSON.stringify(productList));
  }
}
