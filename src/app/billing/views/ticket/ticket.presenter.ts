import { Injectable } from '@angular/core';

import { TicketComponent } from './ticket.component';
import { BillingService } from '~/app/core/services/billing.service';
import { CompanyService } from '~/app/core/services/company.service';
import { ICompany } from '~/app/company/models/company.model';

@Injectable()
export class TicketPresenter {
  private _view: TicketComponent;

  constructor(
    private _billingService: BillingService,
    private _companyService: CompanyService
  ) {}

  setView(view: TicketComponent) {
    this._view = view;
  }

  save(data) {
    this._billingService.sendInvoice(data).subscribe((response) => {
      this._view.onSuccessSaved(response);
    });
  }

  getActiveCompany() {
    this._companyService.getActiveCompany().subscribe((data: ICompany) => {
      this._view.setActiveCompany(data);
    });
  }
}
