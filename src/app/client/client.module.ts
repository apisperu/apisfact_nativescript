import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ListComponent } from './views/list/list.component';
import { ClientRoutingModule } from './client-routing.module';
import { CustomListComponent } from './components/custom-list/custom-list.component';
import { NewComponent } from './views/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { EditComponent } from './views/edit/edit.component';
import { DocumentTypeSelectorModalComponent } from './components/document-type-selector-modal.component/document-type-selector-modal.component';

const components = [CustomListComponent, DocumentTypeSelectorModalComponent];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
  ],
  declarations: [...components, ListComponent, NewComponent, EditComponent],
  entryComponents: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ClientModule {}
