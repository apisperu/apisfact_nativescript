import { Component, OnInit, Input } from '@angular/core';
import { IBilling } from '../../models/billing-extended.model';
import { BillingService } from '~/app/core/services/billing.service';
import { isAndroid } from 'tns-core-modules/platform';
import { path, File } from 'tns-core-modules/file-system';
import { encoding } from 'tns-core-modules/text';
import { HttpResponse } from '@angular/common/http';

declare var android;

@Component({
  selector: 'app-custom-list',
  moduleId: module.id,
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css'],
})
export class CustomListComponent implements OnInit {
  @Input()
  list = [] as IBilling[];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {}

  onItemTapped(correlativo) {
    // this._router.navigate([`client/${numDoc}`]);
  }

  onSelectPdf(item: IBilling) {
    const request = {
      ...item,
    };
    delete request.sunatResponse;
    this.billingService.generatePdf(request).subscribe(
      (response) => {
        console.log(response.body);
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          .split(';')[1]
          .split('filename')[1]
          .split('=')[1]
          .trim();
        this.saveFile(response.body, filename);
      },
      (err) => {
        console.log('ERROR');
        console.log({ err });
      }
    );
    // this.billingService.generatePdf2(request).then(
    //   (result) => {
    //     console.log(typeof result);
    //     console.log(JSON.stringify({ result }));
    //   },
    //   (err) => {
    //     console.log(JSON.stringify({ err }));
    //   }
    // );
  }

  onSelectXml(item: IBilling) {
    const request = {
      ...item,
    };
    delete request.sunatResponse;
    this.billingService.generateXml(request).subscribe(
      (response: HttpResponse<string>) => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          .split(';')[1]
          .split('filename')[1]
          .split('=')[1]
          .trim();
        this.saveFile(response.body, filename);
      },
      (err) => {
        console.log({ err });
      }
    );
  }

  saveFile(content: string, filename: string) {
    if (isAndroid) {
      const permissions = require('nativescript-permissions');
      permissions
        .requestPermission(
          android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          let downloadedFilePath = path.join(
            android.os.Environment.getExternalStoragePublicDirectory(
              android.os.Environment.DIRECTORY_DOWNLOADS
            ).getAbsolutePath(),
            filename
          );

          const xfile = File.fromPath(downloadedFilePath);
          let hasError = false;
          xfile.writeTextSync(
            content,
            (err) => {
              hasError = true;
              console.log(err);
              alert({
                title: 'Error al guardar',
                okButtonText: 'OK',
                message: `${err}`,
              });
            },
            encoding.ISO_8859_1
          );

          if (!hasError) {
            alert({
              title: 'Listo!',
              okButtonText: 'OK',
              message: `El archivo ${filename} se guardó correctamente en tu carpeta de descargas`,
            });
          }
        });
    }
  }

  savePdf(arrayBuffer: ArrayBuffer, filename: string) {
    if (isAndroid) {
      const permissions = require('nativescript-permissions');
      permissions
        .requestPermission(
          android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          let downloadedFilePath = path.join(
            android.os.Environment.getExternalStoragePublicDirectory(
              android.os.Environment.DIRECTORY_DOWNLOADS
            ).getAbsolutePath(),
            filename
          );

          const xfile = File.fromPath(downloadedFilePath);
          const bytesArray = new Uint8Array(arrayBuffer);
          let hasError = false;
          xfile.writeSync(bytesArray, (err) => {
            hasError = true;
            alert({
              title: 'Error al guardar',
              okButtonText: 'OK',
              message: `${err}`,
            });
          });
          if (!hasError) {
            alert({
              title: 'Listo!',
              okButtonText: 'OK',
              message: `El archivo se guardó correctamente en tu carpeta de descargas`,
            });
          }
        });
    }
  }
}
