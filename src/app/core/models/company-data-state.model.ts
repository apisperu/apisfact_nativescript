import { ICompany } from '~/app/company/models/company.model';
import { IProduct } from '~/app/product/models/product.model';
import { IClient } from '~/app/client/models/client.model';
import { IBilling } from '~/app/billing/models/billing-extended.model';

export interface ICompanyDataState {
  active: boolean;
  company: ICompany;
  productList: IProduct[];
  clientList: IClient[];
  billingList: IBilling[];
}
