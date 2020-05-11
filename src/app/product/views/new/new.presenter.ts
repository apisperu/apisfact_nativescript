import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { ProductService } from '~/app/core/services/product.service';
import { IProduct } from '../../models/product.model';
import { ICompany } from '~/app/company/models/company.model';
import { CompanyService } from '~/app/core/services/company.service';

@Injectable()
export class NewPresenter {
  private view: NewComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: NewComponent) {
    this.view = view;
  }

  saveProduct(data: IProduct) {
    this.productService
      .save(this.activeCompany.ruc, data)
      .subscribe((response) => {
        this.view.onSuccessSave(response);
      });
  }
}
