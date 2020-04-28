import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './currency-selector-modal.component.html',
  styleUrls: ['./currency-selector-modal.component.css'],
})
export class CurrencySelectorModalComponent {
  constructor(
    private _params: ModalDialogParams,
    private router: RouterExtensions
  ) {}

  onSelectOptionTapped(code: string): void {
    this._params.closeCallback(code);
  }
  onBack(): void {
    this.router.back();
  }
  onClose(): void {
    this._params.closeCallback('return value');
  }
}
