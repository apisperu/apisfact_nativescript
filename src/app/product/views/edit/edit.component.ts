import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { EditPresenter } from './edit.presenter';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

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
    private page: Page,
    private presenter: EditPresenter,
    private router: RouterExtensions,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {
    this.setForm();
    this.presenter.setView(this);
    this.activatedRoute.params.subscribe((data) => {
      this.codProducto = data.id;
      this.presenter.getProduct(this.codProducto);
    });
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  setData(data: IProduct) {
    this.productForm.get('codProducto').setValue(data.codProducto);
    this.productForm.get('descripcion').setValue(data.descripcion);
    this.productForm.get('unidad').setValue(data.unidad);
    this.productForm.get('mtoValorUnitario').setValue(data.mtoValorUnitario);
  }

  setForm() {
    this.productForm = this.fb.group({
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
    this.router.navigate(['product']);
  }

  onSaveButtonTapped() {
    const data: IProduct = this.productForm.getRawValue();
    this.presenter.updateProduct(data);
  }

  onDeleteButtonTapped() {
    this.presenter.deleteProduct(this.codProducto);
  }

  onSuccessSave(result) {
    this.modalService
      .showModal(SimpleModalComponent, {
        viewContainerRef: this.vcRef,
        fullscreen: false,
        context: {
          image: 'success',
          title: 'Guardado exitoso',
          description: 'El producto se guardó correctamente',
          buttonText: 'Volver',
        },
      })
      .then((data: any) => {
        this.router.navigate(['product']);
      });
  }

  onSuccessDelete(result) {
    this.modalService
      .showModal(SimpleModalComponent, {
        viewContainerRef: this.vcRef,
        fullscreen: false,
        context: {
          image: 'success',
          title: 'Eliminación exitosa',
          description: 'El producto se eliminó correctamente',
          buttonText: 'Volver',
        },
      })
      .then((data: any) => {
        this.router.navigate(['product']);
      });
  }
}
