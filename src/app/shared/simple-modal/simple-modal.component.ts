import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  moduleId: module.id,
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css'],
})
export class SimpleModalComponent {
  title = '';
  buttonText = '';
  description = '';
  image = '';
  constructor(private _params: ModalDialogParams) {
    this.title = _params.context.title;
    this.buttonText = _params.context.buttonText;
    this.description = _params.context.description;
    this.image = _params.context.image;
  }

  onSelectButtonTapped(): void {
    this._params.closeCallback();
  }
}
