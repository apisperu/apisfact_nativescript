import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { ClientService } from '~/app/core/services/client.service';
import { CompanyService } from '~/app/core/services/company.service';
import { ICompany } from '~/app/company/models/company.model';

@Injectable()
export class ListPresenter {
  private view: ListComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private clientService: ClientService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: ListComponent) {
    this.view = view;
  }

  getClientList() {
    this.clientService.getList(this.activeCompany.ruc).subscribe((response) => {
      this.view.setClientList(response);
    });
  }
}
