import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AppStateService } from '~/app/core/services/app-state.service';
import { ListComponent } from './list.component';
import { CompanyService } from '~/app/core/services/company.service';
import { ICompany } from '~/app/company/models/company.model';

@Injectable()
export class ListPresenter {
  private _view: ListComponent;

  constructor(
    private _router: RouterExtensions,
    private _appStateService: AppStateService,
    private _companyService: CompanyService
  ) {}

  setView(view: ListComponent) {
    this._view = view;
  }

  getCompany(ruc: string) {
    this._companyService.getActiveCompany(ruc).subscribe((data: ICompany) => {
      this._view.setCompany(data);
    });
  }
}
