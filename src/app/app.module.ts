import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, CoreModule],
  declarations: [AppComponent],
  providers: [ModalDialogService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
