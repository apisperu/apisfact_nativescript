import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AppStateService } from '~/app/core/services/app-state.service';
import { ListComponent } from './list.component';

@Injectable()
export class ListPresenter {
  private _view: ListComponent;

  constructor(
    private _router: RouterExtensions,
    private _appStateService: AppStateService
  ) {}

  setView(view: ListComponent) {
    this._view = view;
  }
}
