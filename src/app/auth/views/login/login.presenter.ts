import { Injectable } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginService } from '~/app/core/services/login.service';
import { AppStateService } from '~/app/core/services/app-state.service';
import { setString } from 'tns-core-modules/application-settings/application-settings';

@Injectable()
export class LoginPresenter {
  private view: LoginComponent;

  constructor(
    private loginService: LoginService,
    private appStateService: AppStateService
  ) {}

  setView(view: LoginComponent) {
    this.view = view;
  }

  auth(data: any) {
    this.loginService.auth(data).subscribe(
      (response) => {
        this.storeData({ ...data, ...response });
        this.view.onSuccessAuth(response);
      },
      (err) => {
        this.view.onErrorAuth(err);
      }
    );
  }

  private storeData({ username, token }) {
    this.appStateService.set('username', username);
    setString('username', username);
    this.appStateService.set('accessToken', token);
    setString('accessToken', token);
  }
}
