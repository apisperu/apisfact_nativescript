import { Injectable } from '@angular/core';
import { getString, getNumber } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private _state = {};

  constructor() {
    const accessToken = getString('accessToken');

    if (accessToken) {
      this.set('accessToken', accessToken);
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
  }

  private copy(state: any) {
    return JSON.parse(JSON.stringify(state));
  }
}
