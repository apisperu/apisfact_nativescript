import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { NewPresenter } from './new.presenter';
import { Label } from 'tns-core-modules/ui/label/label';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { RouterExtensions } from 'nativescript-angular/router';
import { SimpleModalComponent } from '~/app/shared/simple-modal/simple-modal.component';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'app-company-new',
  moduleId: module.id,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  companyList = [];
  private certificatePath = '';
  private logoPath = '';
  private certificateLabel: Label;
  private logoLabel: Label;

  private businessNameTextField: TextField;
  private rucTextField: TextField;
  private solUserTextField: TextField;
  private solPasswordTextField: TextField;
  private addressTextField: TextField;

  constructor(
    private page: Page,
    private presenter: NewPresenter,
    private router: RouterExtensions,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.certificateLabel = <Label>this.page.getViewById('certificateLabel');
    this.logoLabel = <Label>this.page.getViewById('logoLabel');
    this.businessNameTextField = <TextField>(
      this.page.getViewById('businessNameTextField')
    );
    this.rucTextField = <TextField>this.page.getViewById('rucTextField');
    this.solUserTextField = <TextField>(
      this.page.getViewById('solUserTextField')
    );
    this.solPasswordTextField = <TextField>(
      this.page.getViewById('solPasswordTextField')
    );
    this.addressTextField = <TextField>(
      this.page.getViewById('addressTextField')
    );
  }

  onCertButtonTapped() {
    this.presenter.selectFile('pem');
  }

  onLogoButtonTapped() {
    this.presenter.selectImage();
  }

  setCertificateLabel(value: string) {
    this.certificatePath = value;
    this.certificateLabel.text = value.replace(/^.*[\\\/]/, '');
  }

  setLogoLabel(value: string) {
    this.logoPath = value;
    this.logoLabel.text = value.replace(/^.*[\\\/]/, '');
  }

  onBackTapped() {
    this.router.navigate(['company']);
  }

  onSaveButtonTapped() {
    const data = {
      plan: 'free',
      environment: 'beta',
      sol_user: this.solUserTextField.text,
      sol_pass: this.solPasswordTextField.text,
      ruc: this.rucTextField.text,
      razon_social: this.businessNameTextField.text,
      direccion: this.addressTextField.text,
      certificado: this.certificatePath,
      logo: this.logoPath,
    };
    this.presenter.saveCompany(data);
  }

  onSuccessSave(result) {
    this.modalService
      .showModal(SimpleModalComponent, {
        viewContainerRef: this.vcRef,
        fullscreen: false,
        context: {
          image: 'success',
          title: 'Guardado satisfactorio',
          description: 'La empresa se guardó correctamente',
          buttonText: 'Volver',
        },
      })
      .then(() => {
        this.router.navigate(['company']);
      });
  }

  onErrorSave(result) {
    this.modalService
      .showModal(SimpleModalComponent, {
        viewContainerRef: this.vcRef,
        fullscreen: false,
        context: {
          image: 'error',
          title: 'Error al guardar',
          description: 'Verifique los datos',
          buttonText: 'Cerrar',
        },
      })
      .then(() => {});
  }
}
