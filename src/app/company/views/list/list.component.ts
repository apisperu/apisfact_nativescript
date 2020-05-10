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
    private page: Page,
    private presenter: ListPresenter,
    private router: RouterExtensions
  ) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.presenter.getCompanyList();
  }

  setCompanyList(companyList) {
    this.companyList = companyList;
  }

  onBackTapped() {
    this.router.navigate(['home']);
  }

  onAddButtonTapped() {
    this.router.navigate(['company/new']);
  }
}
