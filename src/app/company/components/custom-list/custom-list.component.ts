import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ICompany } from '../../models/company.model';
import { CompanyService } from '~/app/core/services/company.service';

@Component({
  selector: 'app-custom-list',
  moduleId: module.id,
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css'],
})
export class CustomListComponent implements OnInit {
  @Input()
  list = [];

  constructor(
    private _router: RouterExtensions,
    private _companyService: CompanyService
  ) {}

  ngOnInit(): void {}

  onItemTapped(item: ICompany) {
    this._companyService.storeActiveCompany(item);
    this._router.navigate([`company/menu/:${item.ruc}`]);
  }
}
