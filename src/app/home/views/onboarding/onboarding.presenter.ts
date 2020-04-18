import { Injectable } from '@angular/core';

import { AppStateService } from '~/app/core/services/app-state.service';
import { OnboardingComponent } from './onboarding.component';
import { LoginService } from '~/app/core/services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class OnboardingPresenter {
  private _view: OnboardingComponent;

  constructor(
    private _appStateService: AppStateService,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  setView(view: OnboardingComponent) {
    this._view = view;
  }

  getUserName(): string {
    return this._appStateService.get('username');
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['login']);
  }
}
