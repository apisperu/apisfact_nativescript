import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';
import { ClientService } from '~/app/core/services/client.service';
import { IClient } from '~/app/client/models/client.model';
import { CompanyService } from '~/app/core/services/company.service';

@Component({
  moduleId: module.id,
  templateUrl: './client-selector-modal.component.html',
  styleUrls: ['./client-selector-modal.component.css'],
})
export class ClientSelectorModalComponent {
  clientList: IClient[];
  constructor(
    private params: ModalDialogParams,
    private router: RouterExtensions,
    private clientService: ClientService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.getClients(data.ruc);
    });
  }

  onSelectOptionTapped(client: IClient): void {
    this.params.closeCallback(client);
  }

  getClients(companyRuc: string) {
    this.clientService.getList(companyRuc).subscribe((data) => {
      this.clientList = data;
    });
  }

  onBack(): void {
    this.router.back();
  }
  onClose(): void {
    this.params.closeCallback('return value');
  }
}
