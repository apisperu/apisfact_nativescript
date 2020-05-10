import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { EditPresenter } from './edit.presenter';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EditPresenter],
})
export class EditComponent implements OnInit {
  codProducto = '';
  productForm: FormGroup;

  constructor(
    private _page: Page,
    private _presenter: EditPresenter,
    private _router: RouterExtensions,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.setForm();
    this._presenter.setView(this);
    this._activatedRoute.params.subscribe((data) => {
      this.codProducto = data.id;
      this._presenter.getProduct(this.codProducto);
    });
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setData(data: IProduct) {
    this.productForm.get('codProducto').setValue(data.codProducto);
    this.productForm.get('descripcion').setValue(data.descripcion);
    this.productForm.get('unidad').setValue(data.unidad);
    this.productForm.get('mtoValorUnitario').setValue(data.mtoValorUnitario);
  }

  setForm() {
    this.productForm = this._fb.group({
      descripcion: [null, []],
      codProducto: [
        {
          value: null,
          disabled: true,
        },
        [],
      ],
      unidad: [null, []],
      mtoValorUnitario: [null, []],
    });
  }

  onBackTapped() {
    this._router.navigate(['product']);
  }

  onSaveButtonTapped() {
    const data: IProduct = this.productForm.getRawValue();
    this._presenter.updateProduct(data);
  }

  onDeleteButtonTapped() {
    this._presenter.deleteProduct(this.codProducto);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
