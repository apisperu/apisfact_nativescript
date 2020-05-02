import { Injectable } from '@angular/core';

import { TicketComponent } from './ticket.component';
import { BillingService } from '~/app/core/services/billing.service';
import { CompanyService } from '~/app/core/services/company.service';
import { ICompany } from '~/app/company/models/company.model';
import { IBillingResponse } from '../../models/billing.response';
import {
  IBillingRequest,
  IBillingDetailRequest,
} from '../../models/billing.request';
import { DatePipe } from '@angular/common';
import { CompanyUtil } from '~/app/core/utils/company.util';
import { NumberUtil } from '~/app/core/utils/number.util';
import { IProductExtended } from '~/app/product/models/product-extended.model';

const UBL_VERSION = '2.1';
const IGV_PERCENTAGE = 18;
const TIPO_AFECT_IGV = 10;

@Injectable()
export class TicketPresenter {
  private _view: TicketComponent;

  constructor(
    private _billingService: BillingService,
    private _companyService: CompanyService,
    private _datePipe: DatePipe
  ) {}

  setView(view: TicketComponent) {
    this._view = view;
  }

  save(data: IBillingRequest) {
    this._billingService
      .sendInvoice(data)
      .subscribe((response: IBillingResponse) => {
        if (response.sunatResponse.success) {
          this._view.onSuccessSaved(response);
        } else {
          this._view.onErrorSaved(response);
        }
      });
  }

  getActiveCompany() {
    this._companyService.getActiveCompany().subscribe((data: ICompany) => {
      this._view.setActiveCompany(data);
    });
  }

  buildBillingRequest() {
    const data: IBillingRequest = this._view.ticketForm.value;
    data.fechaEmision = this._datePipe.transform(
      Date.now(),
      'yyyy-MM-ddTHH:mm:ssZZZZZ'
    );
    data.tipoDoc = this._view.documentType;
    data.tipoOperacion = '0101';
    data.company = CompanyUtil.buildSimpleCompany(this._view.company);
    data.client = this._view.client;
    data.tipoMoneda = this._view.currency;
    data.details = this._view.billingDetail;
    data.mtoOperGravadas = this._view.billingDetail.reduce((acc, value) => {
      return acc + value.mtoBaseIgv;
    }, 0);
    data.mtoIGV = this._view.billingDetail.reduce((acc, value) => {
      return acc + value.igv;
    }, 0);
    data.totalImpuestos = this._view.billingDetail.reduce((acc, value) => {
      return acc + value.totalImpuestos;
    }, 0);
    data.valorVenta = this._view.billingDetail.reduce((acc, value) => {
      return acc + value.mtoValorVenta;
    }, 0);
    data.mtoImpVenta = this._view.billingDetail.reduce((acc, value) => {
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

  buildBillingDetailRequest(productExtendedList: IProductExtended[]) {
    return productExtendedList.map((item) => {
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
}
