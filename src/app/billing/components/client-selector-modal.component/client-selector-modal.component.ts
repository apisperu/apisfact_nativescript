import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';
import { ClientService } from '~/app/core/services/client.service';
import { IClient } from '~/app/client/models/client.model';

@Component({
  moduleId: module.id,
  templateUrl: './client-selector-modal.component.html',
  styleUrls: ['./client-selector-modal.component.css'],
})
export class ClientSelectorModalComponent {
  clientList: IClient[];
  constructor(
    private _params: ModalDialogParams,
    private router: RouterExtensions,
    private _clientService: ClientService
  ) {
    this.getClients();
  }

  onSelectOptionTapped(client: IClient): void {
    this._params.closeCallback(client);
  }

  getClients() {
    this._clientService.getList().subscribe((data) => {
      this.clientList = data;
    });
  }

  onBack(): void {
    this.router.back();
  }
  onClose(): void {
    this._params.closeCallback('return value');
  }
}
