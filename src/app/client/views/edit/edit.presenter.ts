import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { ClientService, IItem } from '~/app/core/services/client.service';
import { IClient } from '../../models/client.model';

@Injectable()
export class EditPresenter {
  private _view: EditComponent;

  constructor(private _clientService: ClientService) {}

  setView(view: EditComponent) {
    this._view = view;
  }

  updateClient(data: IClient) {
    this._clientService.update(data).subscribe(() => {
      this._view.onSuccessSave();
    });
  }

  deleteClient(docNumber) {
    this._clientService.delete(docNumber).subscribe(() => {
      this._view.onSuccessDelete();
    });
  }

  getClient(docNumber: string) {
    this._clientService.getByDocNumner(docNumber).subscribe((data) => {
      this._view.setData(data);
    });
  }

  getPersonalDocumentTypeList() {
    this._clientService
      .getPersonalDocumentTypeList()
      .subscribe((data: IItem[]) => {
        this._view.setDocumentTypeList(data);
      });
  }
}
