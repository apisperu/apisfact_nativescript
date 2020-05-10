import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';

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
    private page: Page,
    private presenter: NewPresenter,
    private router: RouterExtensions,
    private fb: FormBuilder,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {
    this.presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  setForm() {
    this.productForm = this.fb.group({
      codProducto: [null, []],
      unidad: [null, []],
      descripcion: [null, []],
      mtoValorUnitario: [null, []],
    });
  }

  onBackTapped() {
    this.router.navigate(['product']);
  }

  onSaveButtonTapped() {
    const data: IProduct = this.productForm.value;
    this.presenter.saveProduct(data);
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
}
