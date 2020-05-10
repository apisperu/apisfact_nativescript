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

  constructor(private page: Page, private presenter: OnboardingPresenter) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.setUsername();
  }

  setUsername() {
    this.username = this.presenter.getUserName();
  }

  onLogoutTapped() {
    this.presenter.logout();
  }
}
