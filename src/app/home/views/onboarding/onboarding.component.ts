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
  loginDate = '';

  constructor(private page: Page, private presenter: OnboardingPresenter) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.setUsername();
    this.setLoginDate();
  }

  setUsername() {
    this.username = this.presenter.getUserName();
  }

  setLoginDate() {
    this.loginDate = this.presenter.getLoginDate();
  }

  onLogoutTapped() {
    this.presenter.logout();
  }
}
