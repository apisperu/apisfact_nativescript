import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { EditPresenter } from './edit.presenter';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DocumentTypeSelectorModalComponent } from '../../components/document-type-selector-modal.component/document-type-selector-modal.component';
import {
  ModalDialogOptions,
  ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { IItem } from '~/app/core/services/client.service';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';

@Component({
  selector: 'app-client-edit',
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EditPresenter],
})
export class EditComponent implements OnInit {
  docNumber = '';
  clientForm: FormGroup;
  documentType = null;
  personalDocumentTypeList = [] as IItem[];

  constructor(
    private page: Page,
    private presenter: EditPresenter,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private vcRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    this.setForm();
    this.presenter.setView(this);
    this.presenter.getPersonalDocumentTypeList();
    this.activatedRoute.params.subscribe((data) => {
      this.docNumber = data.id;
      this.presenter.getClient(this.docNumber);
    });
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  setData(data) {
    const typeDoc = this.personalDocumentTypeList.find(
      (item) => item.code === data.tipoDoc
    );
    this.clientForm.get('tipoDoc').setValue(typeDoc ? typeDoc.value : '');
    this.clientForm.get('numDoc').setValue(data.numDoc);
    this.clientForm.get('rznSocial').setValue(data.rznSocial);
    this.clientForm.get('address').setValue(data.address.direccion);
  }

  setForm() {
    this.clientForm = this.fb.group({
      tipoDoc: [{ value: 'DNI', disabled: true }, []],
      numDoc: [{ value: null, disabled: true }, []],
      rznSocial: [null, []],
      address: [null, []],
    });
  }

  setDocumentTypeList(data: IItem[]) {
    this.personalDocumentTypeList = data;
  }

  onSelectDocumentType() {
    this.createModal(DocumentTypeSelectorModalComponent).then((data: IItem) => {
      if (!data) return;
      this.documentType = data.code;
      this.clientForm.get('tipoDoc').setValue(data.value);
    });
  }

  onBackTapped() {
    this.router.navigate(['client']);
  }

  onSaveButtonTapped() {
    const data = this.clientForm.getRawValue();
    data.tipoDoc = this.documentType;
    data.address = {
      direccion: data.address,
    };
    this.presenter.updateClient(data);
  }

  onDeleteButtonTapped() {
    this.presenter.deleteClient(this.docNumber);
  }

  onSuccessSave() {
    this.createModal(SimpleModalComponent, {
      title: 'Guardado exitoso',
      description: 'El cliente se actualizó correctamente',
      buttonText: 'Volver',
    }).then(() => {
      this.router.navigate(['client']);
    });
  }

  onSuccessDelete() {
    this.createModal(SimpleModalComponent, {
      title: 'Eliminación exitosa',
      description: 'El cliente se eliminó correctamente',
      buttonText: 'Volver',
    }).then(() => {
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
