import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ListComponent } from './views/list/list.component';
import { BillingRoutingModule } from './billing-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, BillingRoutingModule],
  declarations: [ListComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BillingModule {}
