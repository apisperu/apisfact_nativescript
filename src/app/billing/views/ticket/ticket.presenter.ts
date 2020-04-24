import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AppStateService } from '~/app/core/services/app-state.service';
import { TicketComponent } from './ticket.component';
import { BillingService } from '~/app/core/services/billing.service';

@Injectable()
export class TicketPresenter {
  private _view: TicketComponent;

  constructor(
    private _router: RouterExtensions,
    private _appStateService: AppStateService,
    private _billingService: BillingService
  ) {}

  setView(view: TicketComponent) {
    this._view = view;
  }

  save(data) {
    this._billingService.sendInvoice(data).subscribe((response) => {
      this._view.onSuccessSaved(response);
    });
  }
}
