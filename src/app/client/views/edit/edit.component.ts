import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { EditPresenter } from './edit.presenter';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DocumentTypeSelectorModalComponent } from '../../components/document-type-selector-modal.component/document-type-selector-modal.component';
import {
  ModalDialogOptions,
  ModalDialogService,
} from 'nativescript-angular/modal-dialog';

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
  documentTypeList = [];

  constructor(
    private _page: Page,
    private _presenter: EditPresenter,
    private _router: Router,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private vcRef: ViewContainerRef,
    private _modalService: ModalDialogService
  ) {
    this.setForm();
    this._presenter.setView(this);
    this._presenter.getDocumentTypeList();
    this._activatedRoute.params.subscribe((data) => {
      this.docNumber = data.id;
      this._presenter.getClient(this.docNumber);
    });
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setData(data) {
    const typeDoc = this.documentTypeList.find(
      (item) => item.code === data.tipoDoc
    );
    this.clientForm.get('tipoDoc').setValue(typeDoc ? typeDoc.value : '');
    this.clientForm.get('numDoc').setValue(data.numDoc);
    this.clientForm.get('rznSocial').setValue(data.rznSocial);
    this.clientForm.get('address').setValue(data.address.direccion);
  }

  setForm() {
    this.clientForm = this._fb.group({
      tipoDoc: [{ value: 'DNI', disabled: true }, []],
      numDoc: [{ value: null, disabled: true }, []],
      rznSocial: [null, []],
      address: [null, []],
    });
  }

  setDocumentTypeList(data) {
    this.documentTypeList = data;
  }

  onSelectDocumentType() {
    this.createModal(DocumentTypeSelectorModalComponent).then((data: any) => {
      if (!data) return;
      this.documentType = data.code;
      this.clientForm.get('tipoDoc').setValue(data.value);
    });
  }

  createModal(modalComponent: Type<unknown>): Promise<any> {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      fullscreen: false,
    };

    return this._modalService.showModal(modalComponent, options);
  }

  onBackTapped() {
    this._router.navigate(['client']);
  }

  onSaveButtonTapped() {
    const data = this.clientForm.getRawValue();
    data.tipoDoc = this.documentType;
    data.address = {
      direccion: data.address,
    };
    this._presenter.updateClient(data);
  }

  onDeleteButtonTapped() {
    this._presenter.deleteClient(this.docNumber);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
