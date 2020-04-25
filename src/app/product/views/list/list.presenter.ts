import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { ProductService } from '~/app/core/services/product.service';

@Injectable()
export class ListPresenter {
  private _view: ListComponent;

  constructor(private _productService: ProductService) {}

  setView(view: ListComponent) {
    this._view = view;
  }

  getProductList() {
    this._productService.getList().subscribe((response) => {
      this._view.setProductList(response);
    });
  }
}
