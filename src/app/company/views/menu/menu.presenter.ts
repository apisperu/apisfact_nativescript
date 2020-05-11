import { Injectable } from '@angular/core';
import { MenuComponent } from './menu.component';
import { CompanyService } from '~/app/core/services/company.service';
import { ICompany } from '~/app/company/models/company.model';

@Injectable()
export class MenuPresenter {
  private view: MenuComponent;

  constructor(private companyService: CompanyService) {}

  setView(view: MenuComponent) {
    this.view = view;
  }

  getActiveCompany() {
    this.companyService.getActiveCompany().subscribe((data: ICompany) => {
      this.view.setActiveCompany(data);
    });
  }
}
