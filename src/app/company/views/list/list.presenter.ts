import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { CompanyService } from '~/app/core/services/company.service';

@Injectable()
export class ListPresenter {
  private view: ListComponent;

  constructor(private companyService: CompanyService) {}

  setView(view: ListComponent) {
    this.view = view;
  }

  getCompanyList() {
    this.companyService.getList().subscribe((response) => {
      this.view.setCompanyList(response);
    });
  }
}
