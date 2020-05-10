import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ProductService } from '~/app/core/services/product.service';
import { IProduct } from '../../models/product.model';

@Injectable()
export class EditPresenter {
  private _view: EditComponent;

  constructor(
    private _productService: ProductService,
    private _router: RouterExtensions
  ) {}

  setView(view: EditComponent) {
    this._view = view;
  }

  updateProduct(data: IProduct) {
    this._productService.update(data).subscribe((response) => {
      this._view.onSuccessSave(response);
      this._router.navigate(['product']);
    });
  }

  deleteProduct(codProduct) {
    this._productService.delete(codProduct).subscribe((response) => {
      this._router.navigate(['product']);
    });
  }

  getProduct(codProduct: any) {
    this._productService.getByCode(codProduct).subscribe((data) => {
      this._view.setData(data);
    });
  }
}
