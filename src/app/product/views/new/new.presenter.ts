import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ProductService } from '~/app/core/services/product.service';
import { IProduct } from '../../models/product.model';

@Injectable()
export class NewPresenter {
  private _view: NewComponent;

  constructor(
    private _productService: ProductService,
    private _router: RouterExtensions
  ) {}

  setView(view: NewComponent) {
    this._view = view;
  }

  saveProduct(data: IProduct) {
    this._productService.save(data).subscribe((response) => {
      this._view.onSuccessSave(response);
      this._router.navigate(['product']);
    });
  }
}
