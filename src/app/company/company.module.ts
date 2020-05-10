import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ListComponent } from './views/list/list.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CustomListComponent } from './components/custom-list/custom-list.component';
import { NewComponent } from './views/new/new.component';
import { SharedModule } from '../shared/shared.module';

const components = [CustomListComponent];

@NgModule({
  imports: [NativeScriptCommonModule, CompanyRoutingModule, SharedModule],
  declarations: [...components, ListComponent, NewComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CompanyModule {}
