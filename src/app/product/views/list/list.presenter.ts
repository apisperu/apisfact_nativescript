import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { ProductService } from '~/app/core/services/product.service';
import { ICompany } from '~/app/company/models/company.model';
import { CompanyService } from '~/app/core/services/company.service';

@Injectable()
export class ListPresenter {
  private view: ListComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: ListComponent) {
    this.view = view;
  }

  getProductList() {
    this.productService
      .getList(this.activeCompany.ruc)
      .subscribe((response) => {
        this.view.setProductList(response);
      });
  }
}
