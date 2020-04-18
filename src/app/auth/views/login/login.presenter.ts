import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { LoginComponent } from './login.component';
import { LoginService } from '~/app/core/services/login.service';
import { AppStateService } from '~/app/core/services/app-state.service';
import { setString } from 'tns-core-modules/application-settings/application-settings';

@Injectable()
export class LoginPresenter {
  private _view: LoginComponent;

  constructor(
    private _loginService: LoginService,
    private _router: RouterExtensions,
    private _appStateService: AppStateService
  ) {}

  setView(view: LoginComponent) {
    this._view = view;
  }

  auth(data: any) {
    this._appStateService.set('username', data.username);
    setString('username', data.username);
    this._loginService.auth(data).subscribe((response) => {
      setString('accessToken', response.token);
      this._appStateService.set('accessToken', response.token);
      this._router.navigate(['home'], { clearHistory: true });
    });
  }
}
