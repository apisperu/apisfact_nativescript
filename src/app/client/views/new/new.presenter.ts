import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { ClientService } from '~/app/core/services/client.service';
import { IClient } from '../../models/client.model';

@Injectable()
export class NewPresenter {
  private _view: NewComponent;

  constructor(private _clientService: ClientService) {}

  setView(view: NewComponent) {
    this._view = view;
  }

  saveClient(data: IClient) {
    this._clientService.save(data).subscribe(() => {
      this._view.onSuccessSave();
    });
  }
}
