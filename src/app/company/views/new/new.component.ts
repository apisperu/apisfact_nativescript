import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { Label } from 'tns-core-modules/ui/label/label';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-company-new',
  moduleId: module.id,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  companyList = [];
  private _certificatePath = '';
  private _logoPath = '';
  private _certificateLabel: Label;
  private _logoLabel: Label;

  private _businessNameTextField: TextField;
  private _rucTextField: TextField;
  private _solUserTextField: TextField;
  private _solPasswordTextField: TextField;
  private _addressTextField: TextField;

  constructor(
    private _page: Page,
    private _presenter: NewPresenter,
    private _router: RouterExtensions
  ) {
    this._presenter.setView(this);
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this._certificateLabel = <Label>this._page.getViewById('certificateLabel');
    this._logoLabel = <Label>this._page.getViewById('logoLabel');
    this._businessNameTextField = <TextField>(
      this._page.getViewById('businessNameTextField')
    );
    this._rucTextField = <TextField>this._page.getViewById('rucTextField');
    this._solUserTextField = <TextField>(
      this._page.getViewById('solUserTextField')
    );
    this._solPasswordTextField = <TextField>(
      this._page.getViewById('solPasswordTextField')
    );
    this._addressTextField = <TextField>(
      this._page.getViewById('addressTextField')
    );
  }

  onCertButtonTapped() {
    this._presenter.selectFile('pem');
  }

  onLogoButtonTapped() {
    this._presenter.selectImage();
  }

  setCertificateLabel(value: string) {
    this._certificatePath = value;
    this._certificateLabel.text = value.replace(/^.*[\\\/]/, '');
  }

  setLogoLabel(value: string) {
    this._logoPath = value;
    this._logoLabel.text = value.replace(/^.*[\\\/]/, '');
  }

  onBackTapped() {
    this._router.navigate(['company']);
  }

  onSaveButtonTapped() {
    const data = {
      plan: 'free',
      environment: 'beta',
      sol_user: this._solUserTextField.text,
      sol_pass: this._solPasswordTextField.text,
      ruc: this._rucTextField.text,
      razon_social: this._businessNameTextField.text,
      direccion: this._addressTextField.text,
      certificado: this._certificatePath,
      logo: this._logoPath,
    };
    this._presenter.saveCompany(data);
  }

  onSuccessSave(result) {
    console.log({ result });
  }
}
