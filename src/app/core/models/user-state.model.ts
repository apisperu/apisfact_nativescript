import { ICompanyDataState } from './company-data-state.model';

export interface UserState {
  token: string;
  username: string;
  companyDataList: ICompanyDataState[];
}
