import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListPresenter } from './list.presenter';
import { RouterExtensions } from 'nativescript-angular/router';
import { IBilling } from '../../models/billing-extended.model';

@Component({
  selector: 'app-billing-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  billingList = [] as IBilling[];

  constructor(
    private page: Page,
    private presenter: ListPresenter,
    private router: RouterExtensions
  ) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.presenter.getBillingList();
  }

  setBillingList(billingList) {
    this.billingList = billingList;
  }

  onBackTapped() {
    this.router.back();
  }
}
