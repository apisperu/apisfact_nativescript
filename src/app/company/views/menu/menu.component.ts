import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { MenuPresenter } from './menu.presenter';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ICompany } from '~/app/company/models/company.model';

@Component({
  selector: 'app-company-menu',
  moduleId: module.id,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuPresenter],
})
export class MenuComponent implements OnInit {
  company: ICompany = null;
  constructor(
    private page: Page,
    private presenter: MenuPresenter,
    private activatedRoute: ActivatedRoute,
    private router: RouterExtensions
  ) {
    this.presenter.setView(this);
    this.activatedRoute.params.subscribe((data) => {
      this.presenter.getActiveCompany();
    });
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  setActiveCompany(data: ICompany) {
    this.company = data;
  }
  onBackTapped() {
    this.router.navigate(['company']);
  }
}
