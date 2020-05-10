import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  ModalDialogOptions,
  ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { DocumentTypeSelectorModalComponent } from '../../components/document-type-selector-modal.component/document-type-selector-modal.component';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';

@Component({
  selector: 'app-client-new',
  moduleId: module.id,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  clientForm: FormGroup;
  documentType = null;

  constructor(
    private page: Page,
    private presenter: NewPresenter,
    private router: RouterExtensions,
    private fb: FormBuilder,
    private vcRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    this.presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  setForm() {
    this.clientForm = this.fb.group({
      tipoDoc: [{ value: 'DNI', disabled: true }, []],
      numDoc: [null, []],
      rznSocial: [null, []],
      address: [null, []],
    });
  }

  onSelectDocumentType() {
    this.createModal(DocumentTypeSelectorModalComponent).then((data: any) => {
      if (!data) return;
      this.documentType = data.code;
      this.clientForm.get('tipoDoc').setValue(data.value);
    });
  }

  onBackTapped() {
    this.router.navigate(['client']);
  }

  onSaveButtonTapped() {
    const data = this.clientForm.value;
    data.tipoDoc = this.documentType;
    data.address = {
      direccion: data.address,
    };
    this.presenter.saveClient(data);
  }

  onSuccessSave() {
    this.createModal(SimpleModalComponent, {
      image: 'success',
      title: 'Guardado exitoso',
      description: 'El cliente se guardó correctamente',
      buttonText: 'Volver',
    }).then((data: any) => {
      this.router.navigate(['client']);
    });
  }

  private createModal(
    modalComponent: Type<unknown>,
    params?: any
  ): Promise<any> {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: params,
      fullscreen: false,
    };

    return this.modalService.showModal(modalComponent, options);
  }
}
