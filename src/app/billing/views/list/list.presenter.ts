import { Injectable } from '@angular/core';
import { ListComponent } from './list.component';
import { BillingService } from '~/app/core/services/billing.service';
import { ICompany } from '~/app/company/models/company.model';
import { CompanyService } from '~/app/core/services/company.service';

@Injectable()
export class ListPresenter {
  private view: ListComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private billingService: BillingService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: ListComponent) {
    this.view = view;
  }

  getBillingList() {
    this.billingService
      .getList(this.activeCompany.ruc)
      .subscribe((response) => {
        this.view.setBillingList(response);
      });
  }
}
