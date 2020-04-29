import { Component, OnInit, ViewContainerRef, Type } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { TicketPresenter } from './ticket.presenter';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICompany } from '~/app/company/models/company.model';
import {
  IBillingRequest,
  IBillingDetailRequest,
} from '../../models/billing.request';
import { CompanyUtil } from '~/app/core/utils/company.util';
import {
  ModalDialogOptions,
  ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { CurrencySelectorModalComponent } from '../../components/currency-selector-modal.component/currency-selector-modal.component';
import { ClientSelectorModalComponent } from '../../components/client-selector-modal.component/client-selector-modal.component';
import { IClient } from '~/app/client/models/client.model';
import { ProductSelectorModalComponent } from '../../components/product-selector-modal.component/product-selector-modal.component';
import { IProductExtended } from '~/app/product/models/product-extended.model';
import { NumberUtil } from '~/app/core/utils/number.util';
import { DocumentTypeSelectorModalComponent } from '../../components/document-type-selector-modal.component/document-type-selector-modal.component';
import { DatePipe } from '@angular/common';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';
import { RouterExtensions } from 'nativescript-angular/router';

const IGV_PERCENTAGE = 18;
const TIPO_AFECT_IGV = 10;
const UBL_VERSION = '2.1';
const TIPO_DOC_BOLETA = '03';
const TIPO_DOC_FACTURA = '01';
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
  currency = 'PEN';
  billingDetail: IBillingDetailRequest[] = [];

  constructor(
    private _page: Page,
    private _presenter: TicketPresenter,
    private _routerExtension: RouterExtensions,
    private _router: Router,
    private _fb: FormBuilder,
    private vcRef: ViewContainerRef,
    private _modalService: ModalDialogService,
    private _datePipe: DatePipe
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
    const request = this.formatData();
    console.log({ request });
    this._presenter.save(request);
  }

  onSuccessSaved(response) {
    console.log({ response: response.sunatResponse });
    this.createModal(SimpleModalComponent, {
      title: 'Envío exitoso',
      buttonText: 'Volver',
    }).then((data) => {
      this._routerExtension.back();
    });
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
        this.billingDetail = data.map((item) => {
          const subTotal = item.mtoValorUnitario * item.cantidad;
          const totalIgv = (subTotal * IGV_PERCENTAGE) / 100;
          return {
            cantidad: item.cantidad,
            codProducto: item.codProducto,
            descripcion: item.descripcion,
            mtoValorUnitario: item.mtoValorUnitario,
            unidad: item.unidad,
            mtoValorVenta: subTotal,
            mtoBaseIgv: subTotal,
            porcentajeIgv: IGV_PERCENTAGE,
            igv: totalIgv,
            tipAfeIgv: TIPO_AFECT_IGV,
            totalImpuestos: totalIgv,
            mtoPrecioUnitario: item.mtoValorUnitario + totalIgv / item.cantidad,
          } as IBillingDetailRequest;
        });
      }
    );
  }

  createModal(modalComponent: Type<unknown>, params?: any): Promise<any> {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: params,
      fullscreen: false,
    };

    return this._modalService.showModal(modalComponent, options);
  }

  private formatData() {
    const data: IBillingRequest = this.ticketForm.value;
    data.fechaEmision = this._datePipe.transform(
      Date.now(),
      'yyyy-MM-ddTHH:mm:ssZZZZZ'
    );
    data.tipoDoc = this.documentType;
    data.tipoOperacion = '0101';
    data.company = CompanyUtil.buildSimpleCompany(this.company);
    data.client = this.client;
    data.tipoMoneda = this.currency;
    data.details = this.billingDetail;
    data.mtoOperGravadas = this.billingDetail.reduce((acc, value) => {
      return acc + value.mtoBaseIgv;
    }, 0);
    data.mtoIGV = this.billingDetail.reduce((acc, value) => {
      return acc + value.igv;
    }, 0);
    data.totalImpuestos = this.billingDetail.reduce((acc, value) => {
      return acc + value.totalImpuestos;
    }, 0);
    data.valorVenta = this.billingDetail.reduce((acc, value) => {
      return acc + value.mtoValorVenta;
    }, 0);
    data.mtoImpVenta = this.billingDetail.reduce((acc, value) => {
      return acc + value.mtoValorVenta + value.totalImpuestos;
    }, 0);
    data.ublVersion = UBL_VERSION;
    data.legends = [
      {
        code: '1000',
        value: NumberUtil.buildLegend(data.mtoImpVenta),
      },
    ];
    return data;
  }
}
