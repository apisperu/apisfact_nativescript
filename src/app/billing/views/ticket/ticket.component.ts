import { Component, OnInit, ViewContainerRef, Type } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { TicketPresenter } from './ticket.presenter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICompany } from '~/app/company/models/company.model';
import {
  IBillingRequest,
  IBillingDetailRequest,
} from '../../models/billing.request';
import {
  ModalDialogOptions,
  ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { CurrencySelectorModalComponent } from '../../components/currency-selector-modal.component/currency-selector-modal.component';
import { ClientSelectorModalComponent } from '../../components/client-selector-modal.component/client-selector-modal.component';
import { IClient } from '~/app/client/models/client.model';
import { ProductSelectorModalComponent } from '../../components/product-selector-modal.component/product-selector-modal.component';
import { IProductExtended } from '~/app/product/models/product-extended.model';
import { DocumentTypeSelectorModalComponent } from '../../components/document-type-selector-modal.component/document-type-selector-modal.component';
import { DatePipe } from '@angular/common';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { IBillingResponse } from '../../models/billing.response';

const TIPO_DOC_BOLETA = '03';
const CURRENCY_SOLES = 'PEN';

@Component({
  selector: 'app-billing-ticket',
  moduleId: module.id,
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [TicketPresenter, DatePipe],
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  company: ICompany = null;
  client: IClient = null;
  documentType = TIPO_DOC_BOLETA;
  currency = CURRENCY_SOLES;
  billingDetail: IBillingDetailRequest[] = [];

  constructor(
    private _page: Page,
    private _presenter: TicketPresenter,
    private _router: RouterExtensions,
    private _fb: FormBuilder,
    private vcRef: ViewContainerRef,
    private _modalService: ModalDialogService
  ) {
    this._presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this._presenter.getActiveCompany();
  }

  setForm() {
    this.ticketForm = this._fb.group({
      tipoDoc: [{ value: 'Boleta', disabled: true }, []],
      serie: ['B001', []],
      correlativo: ['1', []],
      tipoMoneda: [
        {
          value: this.currency,
          disabled: true,
        },
      ],
      client: [{ value: null, disabled: true }, []],
    });
  }

  onSaveButtonTapped() {
    const request: IBillingRequest = this._presenter.buildBillingRequest();
    this._presenter.save(request);
  }

  onSuccessSaved(response: IBillingResponse) {
    this.createModal(SimpleModalComponent, {
      image: 'success',
      title: 'Envío exitoso',
      description: response.sunatResponse.cdrResponse.description,
      buttonText: 'Volver',
    }).then((data) => {
      this._router.back();
    });
  }

  onErrorSaved(response: IBillingResponse) {
    this.createModal(SimpleModalComponent, {
      image: 'error',
      title: 'Ocurrió un error',
      description: response.sunatResponse.error.message,
      buttonText: 'Cerrar',
    }).then((data) => {});
  }

  onBackTapped() {
    this._router.navigate([`billing/${this.company.ruc}`]);
  }

  setActiveCompany(company: ICompany) {
    this.company = company;
  }

  onSelectDocumentType() {
    this.createModal(DocumentTypeSelectorModalComponent).then((data: any) => {
      if (!data) return;
      this.documentType = data.code;
      this.ticketForm.get('tipoDoc').setValue(data.value);
    });
  }

  onSelectCurrency() {
    this.createModal(CurrencySelectorModalComponent).then((data: string) => {
      if (!data) return;
      this.currency = data;
      this.ticketForm.get('tipoMoneda').setValue(data);
    });
  }

  onSelectClient() {
    this.createModal(ClientSelectorModalComponent).then((data: IClient) => {
      if (!data) return;
      this.client = data;
      this.ticketForm.get('client').setValue(data.rznSocial);
    });
  }

  onSelectProduct() {
    this.createModal(ProductSelectorModalComponent).then(
      (data: IProductExtended[]) => {
        if (!data || data.length === 0) return;
        this.billingDetail = this._presenter.buildBillingDetailRequest(data);
      }
    );
  }

  private createModal(
    modalComponent: Type<unknown>,
    params?: any
  ): Promise<any> {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: params,
      fullscreen: false,
    };

    return this._modalService.showModal(modalComponent, options);
  }
}
