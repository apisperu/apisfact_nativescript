import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { EditPresenter } from './edit.presenter';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EditPresenter],
})
export class EditComponent implements OnInit {
  docNumber = '';
  clientForm: FormGroup;

  constructor(
    private _page: Page,
    private _presenter: EditPresenter,
    private _router: Router,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.setForm();
    this._presenter.setView(this);
    this._activatedRoute.params.subscribe((data) => {
      this.docNumber = data.id;
      this._presenter.getClient(this.docNumber);
    });
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
  }

  setData(data) {
    this.clientForm.get('numDoc').setValue(data.numDoc);
    this.clientForm.get('rznSocial').setValue(data.rznSocial);
    this.clientForm.get('address').setValue(data.address.direccion);
  }

  setForm() {
    this.clientForm = this._fb.group({
      tipoDoc: ['1', []],
      numDoc: [
        {
          value: null,
          disabled: true,
        },
        [],
      ],
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
    this._presenter.updateClient(data);
  }

  onDeleteButtonTapped() {
    this._presenter.deleteClient(this.docNumber);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
