import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { LoginComponent } from '../view/login.component';
import { LoginService } from '~/app/shared/services/login.service';

@Injectable()
export class LoginPresenter {
  private _view: LoginComponent;

  constructor(
    private _loginService: LoginService,
    private _router: RouterExtensions
  ) {}

  setView(view: LoginComponent) {
    this._view = view;
  }

  auth(data: any) {
    this._loginService.auth(data).subscribe(() => {
      this._router.navigate(['home'], { clearHistory: true });
    });
  }
}
