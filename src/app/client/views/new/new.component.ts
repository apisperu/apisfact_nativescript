import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  ModalDialogOptions,
  ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { DocumentTypeSelectorModalComponent } from '../../components/document-type-selector-modal.component/document-type-selector-modal.component';

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
    private _page: Page,
    private _presenter: NewPresenter,
    private _router: Router,
    private _fb: FormBuilder,
    private vcRef: ViewContainerRef,
    private _modalService: ModalDialogService
  ) {
    this._presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setForm() {
    this.clientForm = this._fb.group({
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
    const data = this.clientForm.value;
    data.tipoDoc = this.documentType;
    data.address = {
      direccion: data.address,
    };
    this._presenter.saveClient(data);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
