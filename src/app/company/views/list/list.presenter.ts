import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { CompanyService } from '~/app/core/services/company.service';

@Injectable()
export class ListPresenter {
  private _view: ListComponent;

  constructor(private _companyService: CompanyService) {}

  setView(view: ListComponent) {
    this._view = view;
  }

  getCompanyList() {
    this._companyService.getList().subscribe((response) => {
      this._view.setCompanyList(response);
    });
  }
}
