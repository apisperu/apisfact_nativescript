import { Injectable } from '@angular/core';
import { knownFolders, path, File, Folder } from 'tns-core-modules/file-system';

import { NewComponent } from './new.component';
import { Router } from '@angular/router';
import { ClientService } from '~/app/core/services/client.service';

declare var android;

@Injectable()
export class NewPresenter {
  private _view: NewComponent;

  constructor(private _clientService: ClientService, private _router: Router) {}

  setView(view: NewComponent) {
    this._view = view;
  }

  saveClient(data: any) {
    this._clientService.save(data).subscribe((response) => {
      this._view.onSuccessSave(response);
      this._router.navigate(['client']);
    });
  }
}
