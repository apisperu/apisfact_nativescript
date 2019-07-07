import { Component, OnInit } from '@angular/core';
import { LoginPresenter } from '../presenter/login.presenter';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'Login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _userTextField: TextField;
  private _passwordTextField: TextField;

  constructor(private _presenter: LoginPresenter, private _page: Page) {
    this._presenter.setView(this);
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this._userTextField = <TextField>this._page.getViewById('userTextField');
    this._passwordTextField = <TextField>(
      this._page.getViewById('passwordTextField')
    );
  }

  onLoginButtonTapped() {
    this._presenter.auth({
      user: this._userTextField.text,
      password: this._passwordTextField.text
    });
  }
}
