import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListPresenter } from './list.presenter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  productList = [];

  constructor(
    private _page: Page,
    private _presenter: ListPresenter,
    private _router: Router
  ) {
    this._presenter.setView(this);
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this._presenter.getProductList();
  }

  setProductList(productList) {
    this.productList = productList;
  }

  onBackTapped() {
    this._router.navigate(['home']);
  }

  onAddButtonTapped() {
    this._router.navigate(['product/new']);
  }
}
