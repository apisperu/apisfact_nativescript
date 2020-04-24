import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-new',
  moduleId: module.id,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private _page: Page,
    private _presenter: NewPresenter,
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
    this.clientForm = this._fb.group({
      tipoDoc: ['1', []],
      numDoc: [null, []],
      rznSocial: [null, []],
      address: [null, []],
    });
  }

  onBackTapped() {
    this._router.navigate(['client']);
  }

  onSaveButtonTapped() {
    const data = this.clientForm.value;

    data.address = {
      direccion: data.address,
    };
    this._presenter.saveClient(data);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
