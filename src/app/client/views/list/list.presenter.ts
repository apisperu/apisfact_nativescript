import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { ClientService } from '~/app/core/services/client.service';

@Injectable()
export class ListPresenter {
  private _view: ListComponent;

  constructor(private _clientService: ClientService) {}

  setView(view: ListComponent) {
    this._view = view;
  }

  getClientList() {
    this._clientService.getList().subscribe((response) => {
      this._view.setClientList(response);
    });
  }
}
