import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListPresenter } from './list.presenter';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from '~/app/company/models/company.model';

@Component({
  selector: 'app-billing-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  company: ICompany = null;
  constructor(
    private _page: Page,
    private _presenter: ListPresenter,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._presenter.setView(this);
    this._activatedRoute.params.subscribe((data) => {
      this._presenter.getActiveCompany();
    });
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setActiveCompany(data: ICompany) {
    this.company = data;
  }
  onBackTapped() {
    this._router.navigate(['company']);
  }
}
