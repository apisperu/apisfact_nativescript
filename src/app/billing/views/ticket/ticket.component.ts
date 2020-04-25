import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { TicketPresenter } from './ticket.presenter';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-billing-ticket',
  moduleId: module.id,
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [TicketPresenter],
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  currencyList = [
    {
      key: 'PEN',
      value: 'Soles',
    },
    {
      key: 'USD',
      value: 'Dólares',
    },
  ];

  constructor(
    private _page: Page,
    private _presenter: TicketPresenter,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this._presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setForm() {
    this.ticketForm = this._fb.group({
      tipoOperacion: ['0101', []], // fijo
      tipoDoc: ['03', []], // fijo
      serie: ['B001', []],
      correlativo: ['1', []],
      fechaEmision: ['2019-10-27T00:00:00-05:00', []], // set current date
      tipoMoneda: ['PEN'],
      client: [
        {
          tipoDoc: '1',
          numDoc: 47602928,
          rznSocial: 'EDGAR ANTONIO FLORES',
          address: {
            direccion: 'AV LOS GERUNDIOS',
          },
        },
        [],
      ],
      company: [
        {
          ruc: 20000000008,
          razonSocial: 'Empresa RJ',
          address: {
            direccion: 'Direccion rj',
          },
        },
        [],
      ], // Set company antes de elegir esta página
      mtoOperGravadas: [100, []],
      mtoIGV: [18, []],
      totalImpuestos: [18, []],
      valorVenta: [100, []],
      mtoImpVenta: [118, []],
      ublVersion: ['2.1', []],
      details: [
        [
          {
            codProducto: 'P001',
            unidad: 'NIU',
            descripcion: 'PRODUCTO 1',
            cantidad: 2,
            mtoValorUnitario: 50,
            mtoValorVenta: 100,
            mtoBaseIgv: 100,
            porcentajeIgv: 18,
            igv: 18,
            tipAfeIgv: 10,
            totalImpuestos: 18,
            mtoPrecioUnitario: 59,
          },
        ],
        [],
      ],
      legends: [
        [
          {
            code: '1000',
            value: 'SON CIENTO DIECIOCHO CON 00/100 SOLES',
          },
        ],
        [],
      ],
    });
  }

  onSelectedCurrency(currency) {
    console.log({ currency });
  }

  onSaveButtonTapped() {
    console.log(this.ticketForm.value);
    this._presenter.save(this.ticketForm.value);
  }

  onSuccessSaved(response) {
    console.log({ response });
    console.log(response.sunatResponse);
  }

  onBackTapped() {
    // TODO: set company ruc in the path
    this._router.navigate(['billing']);
  }

  private formatData() {
    const data = this.ticketForm.value;
    return data;
  }
}
