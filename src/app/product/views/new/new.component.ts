import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-new',
  moduleId: module.id,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private _page: Page,
    private _presenter: NewPresenter,
    private _router: RouterExtensions,
    private _fb: FormBuilder
  ) {
    this._presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setForm() {
    this.productForm = this._fb.group({
      codProducto: [null, []],
      unidad: [null, []],
      descripcion: [null, []],
      mtoValorUnitario: [null, []],
    });
  }

  onBackTapped() {
    this._router.navigate(['product']);
  }

  onSaveButtonTapped() {
    const data: IProduct = this.productForm.value;
    this._presenter.saveProduct(data);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
