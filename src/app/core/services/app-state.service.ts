import { Injectable } from '@angular/core';
import { getString, clear } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private _state = {};

  constructor() {
    const accessToken = getString('accessToken');
    const username = getString('username');
    const companyDataStateList = getString('companyDataStateList');

    if (accessToken) {
      this.set('accessToken', accessToken);
    }

    if (username) {
      this.set('username', username);
    }
    if (companyDataStateList) {
      this.set('companyDataStateList', JSON.parse(companyDataStateList));
    }
  }

  get state() {
    return this.copy(this._state);
  }

  set state(value: any) {
    throw new Error('The state cannot be updated');
  }

  set(key: string, value: any) {
    this._state[key] = value;
  }

  get(key: string) {
    return this._state.hasOwnProperty(key) ? this._state[key] : null;
  }

  reset() {
    this._state = {};
    clear();
  }

  private copy(state: any) {
    return JSON.parse(JSON.stringify(state));
  }
}
