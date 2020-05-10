import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ProductService } from '~/app/core/services/product.service';
import { IProduct } from '../../models/product.model';

@Injectable()
export class EditPresenter {
  private view: EditComponent;

  constructor(
    private productService: ProductService,
    private router: RouterExtensions
  ) {}

  setView(view: EditComponent) {
    this.view = view;
  }

  updateProduct(data: IProduct) {
    this.productService.update(data).subscribe((response) => {
      this.view.onSuccessSave(response);
    });
  }

  deleteProduct(codProduct) {
    this.productService.delete(codProduct).subscribe((response) => {
      this.view.onSuccessDelete(response);
    });
  }

  getProduct(codProduct: any) {
    this.productService.getByCode(codProduct).subscribe((data) => {
      this.view.setData(data);
    });
  }
}
