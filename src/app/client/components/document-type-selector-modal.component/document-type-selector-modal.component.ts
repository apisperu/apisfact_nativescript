import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';
import { ClientService, IItem } from '~/app/core/services/client.service';

@Component({
  moduleId: module.id,
  templateUrl: './document-type-selector-modal.component.html',
  styleUrls: ['./document-type-selector-modal.component.css'],
})
export class DocumentTypeSelectorModalComponent {
  personalDocumentTypeList = [] as IItem[];
  constructor(
    private params: ModalDialogParams,
    private router: RouterExtensions,
    private clientService: ClientService
  ) {
    this.getPersonalDocumentType();
  }

  getPersonalDocumentType() {
    this.clientService.getPersonalDocumentTypeList().subscribe((data) => {
      this.personalDocumentTypeList = data;
    });
  }

  onSelectOptionTapped(document: IItem): void {
    this.params.closeCallback(document);
  }
  onBack(): void {
    this.router.back();
  }
  onClose(): void {
    this.params.closeCallback('return value');
  }
}
