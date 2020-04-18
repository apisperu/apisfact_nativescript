import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { OnboardingPresenter } from './onboarding.presenter';

@Component({
  selector: 'app-onboarding',
  moduleId: module.id,
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
  providers: [OnboardingPresenter],
})
export class OnboardingComponent implements OnInit {
  username = '';

  constructor(private _page: Page, private _presenter: OnboardingPresenter) {
    this._presenter.setView(this);
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this.setUsername();
  }

  setUsername() {
    this.username = this._presenter.getUserName() || 'carlos';
  }

  onLogoutTapped() {
    this._presenter.logout();
  }
}
