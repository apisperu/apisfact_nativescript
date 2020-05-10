import { Injectable } from '@angular/core';
import { File } from 'tns-core-modules/file-system';

import { NewComponent } from './new.component';
import { CompanyService } from '~/app/core/services/company.service';
import { FilePickerService } from '~/app/core/services/file-picker.service';

declare var android;

@Injectable()
export class NewPresenter {
  private view: NewComponent;

  constructor(
    private companyService: CompanyService,
    private filePickerService: FilePickerService
  ) {}

  setView(view: NewComponent) {
    this.view = view;
  }

  selectFile(extension: string) {
    this.filePickerService.selectFile(
      extension,
      (result) => {
        this.view.setCertificateLabel(result[0].file);
      },
      () => {},
      () => {}
    );
  }

  selectImage() {
    this.filePickerService.selectImage(
      (result) => {
        this.view.setLogoLabel(result[0].file);
      },
      () => {},
      () => {}
    );
  }

  saveCompany(data: any) {
    this.companyService
      .save({
        ...data,
        certificado: this.toBase64(data.certificado),
        logo: this.toBase64(data.logo),
      })
      .subscribe(
        (response) => {
          this.view.onSuccessSave(response);
        },
        (err) => {
          this.view.onErrorSave(err);
        }
      );
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
