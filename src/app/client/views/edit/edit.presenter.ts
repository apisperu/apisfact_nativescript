import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { Router } from '@angular/router';
import { ClientService } from '~/app/core/services/client.service';

@Injectable()
export class EditPresenter {
  private _view: EditComponent;

  constructor(private _clientService: ClientService, private _router: Router) {}

  setView(view: EditComponent) {
    this._view = view;
  }

  updateClient(data: any) {
    this._clientService.update(data).subscribe((response) => {
      this._view.onSuccessSave(response);
      this._router.navigate(['client']);
    });
  }

  deleteClient(docNumber) {
    this._clientService.delete(docNumber).subscribe((response) => {
      this._router.navigate(['client']);
    });
  }

  getClient(docNumber: any) {
    this._clientService.getByDocNumner(docNumber).subscribe((data) => {
      this._view.setData(data);
    });
  }

  getDocumentTypeList() {
    this._clientService.getDocumentTypeList().subscribe((data) => {
      this._view.setDocumentTypeList(data);
    });
  }
}
