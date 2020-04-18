import { Injectable } from '@angular/core';
import { knownFolders, path, File, Folder } from 'tns-core-modules/file-system';

import { NewComponent } from './new.component';
import { CompanyService } from '~/app/core/services/company.service';
import { Router } from '@angular/router';
import { FilePickerService } from '~/app/core/services/file-picker.service';

declare var android;

@Injectable()
export class NewPresenter {
  private _view: NewComponent;

  constructor(
    private _companyService: CompanyService,
    private _router: Router,
    private _filePickerService: FilePickerService
  ) {}

  setView(view: NewComponent) {
    this._view = view;
  }

  selectFile(extension: string) {
    this._filePickerService.selectFile(
      extension,
      (result) => {
        this._view.setCertificateLabel(result[0].file);
      },
      () => {},
      () => {}
    );
  }

  selectImage() {
    this._filePickerService.selectImage(
      (result) => {
        this._view.setLogoLabel(result[0].file);
      },
      () => {},
      () => {}
    );
  }

  saveCompany(data: any) {
    // this.checkIfFileExist(data.certificado);
    // this.toBase64(data.certificado);
    // this.checkIfFileExist(data.logo);
    // this.toBase64(data.logo);
    this._companyService
      .save({
        ...data,
        certificado: this.toBase64(data.certificado),
        logo: this.toBase64(data.logo),
      })
      .subscribe((response) => {
        this._view.onSuccessSave(response);
        this._router.navigate(['company']);
      });
  }

  private checkIfFileExist(path: string) {
    let exists = File.exists(path);
    console.log(`Does ${path} exists: ` + exists);
  }

  private toBase64(path) {
    let file = File.fromPath(path);
    const base64String = android.util.Base64.encodeToString(
      file.readSync(),
      android.util.Base64.NO_WRAP
    );
    return base64String;
  }
}
