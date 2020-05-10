import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ListComponent } from './views/list/list.component';
import { CustomListComponent } from './components/custom-list/custom-list.component';
import { NewComponent } from './views/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { EditComponent } from './views/edit/edit.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

const components = [CustomListComponent];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    SharedModule,
  ],
  declarations: [...components, ListComponent, NewComponent, EditComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductModule {}
