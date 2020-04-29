import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './document-type-selector-modal.component.html',
  styleUrls: ['./document-type-selector-modal.component.css'],
})
export class DocumentTypeSelectorModalComponent {
  documentTypeList = [
    {
      code: '03',
      value: 'Boleta',
    },
    {
      code: '01',
      value: 'Factura',
    },
  ];
  constructor(
    private _params: ModalDialogParams,
    private router: RouterExtensions
  ) {}

  onSelectOptionTapped(document: any): void {
    this._params.closeCallback(document);
  }
  onBack(): void {
    this.router.back();
  }
  onClose(): void {
    this._params.closeCallback('return value');
  }
}
