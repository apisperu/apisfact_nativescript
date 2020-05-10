import { Injectable } from '@angular/core';

import { AppStateService } from '~/app/core/services/app-state.service';
import { OnboardingComponent } from './onboarding.component';
import { LoginService } from '~/app/core/services/login.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable()
export class OnboardingPresenter {
  private view: OnboardingComponent;

  constructor(
    private appStateService: AppStateService,
    private loginService: LoginService,
    private router: RouterExtensions
  ) {}

  setView(view: OnboardingComponent) {
    this.view = view;
  }

  getUserName(): string {
    return this.appStateService.get('username');
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
