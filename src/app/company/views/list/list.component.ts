import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListPresenter } from './list.presenter';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-company-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  companyList = [];

  constructor(
    private _page: Page,
    private _presenter: ListPresenter,
    private _router: RouterExtensions
  ) {
    this._presenter.setView(this);
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this._presenter.getCompanyList();
  }

  setCompanyList(companyList) {
    this.companyList = companyList;
  }

  onBackTapped() {
    this._router.navigate(['home']);
  }

  onAddButtonTapped() {
    this._router.navigate(['company/new']);
  }
}
