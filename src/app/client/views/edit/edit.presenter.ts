import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { ClientService, IItem } from '~/app/core/services/client.service';
import { IClient } from '../../models/client.model';
import { CompanyService } from '~/app/core/services/company.service';
import { ICompany } from '~/app/company/models/company.model';

@Injectable()
export class EditPresenter {
  private view: EditComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private clientService: ClientService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: EditComponent) {
    this.view = view;
  }

  updateClient(data: IClient) {
    this.clientService.update(this.activeCompany.ruc, data).subscribe(() => {
      this.view.onSuccessSave();
    });
  }

  deleteClient(docNumber) {
    this.clientService
      .delete(this.activeCompany.ruc, docNumber)
      .subscribe(() => {
        this.view.onSuccessDelete();
      });
  }

  getClient(docNumber: number) {
    this.clientService
      .getByDocNumner(this.activeCompany.ruc, docNumber)
      .subscribe((data) => {
        this.view.setData(data);
      });
  }

  getPersonalDocumentTypeList() {
    this.clientService
      .getPersonalDocumentTypeList()
      .subscribe((data: IItem[]) => {
        this.view.setDocumentTypeList(data);
      });
  }
}
