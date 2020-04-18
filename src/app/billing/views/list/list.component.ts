import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListPresenter } from './list.presenter';

@Component({
  selector: 'app-billing-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  constructor(private _page: Page, private _presenter: ListPresenter) {}

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }
}
