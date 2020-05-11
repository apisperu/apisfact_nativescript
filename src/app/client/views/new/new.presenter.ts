import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { ClientService } from '~/app/core/services/client.service';
import { IClient } from '../../models/client.model';
import { ICompany } from '~/app/company/models/company.model';
import { CompanyService } from '~/app/core/services/company.service';

@Injectable()
export class NewPresenter {
  private view: NewComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private clientService: ClientService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: NewComponent) {
    this.view = view;
  }

  saveClient(data: IClient) {
    this.clientService.save(this.activeCompany.ruc, data).subscribe(() => {
      this.view.onSuccessSave();
    });
  }
}
