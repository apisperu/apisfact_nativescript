import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ListComponent } from './views/list/list.component';
import { BillingRoutingModule } from './billing-routing.module';
import { TicketComponent } from './views/ticket/ticket.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { CurrencySelectorModalComponent } from './components/currency-selector-modal.component/currency-selector-modal.component';
import { ClientSelectorModalComponent } from './components/client-selector-modal.component/client-selector-modal.component';
import { ProductSelectorModalComponent } from './components/product-selector-modal.component/product-selector-modal.component';
import { DocumentTypeSelectorModalComponent } from './components/document-type-selector-modal.component/document-type-selector-modal.component';

const components = [
  CurrencySelectorModalComponent,
  ClientSelectorModalComponent,
  ProductSelectorModalComponent,
  DocumentTypeSelectorModalComponent,
];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    BillingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
  ],
  declarations: [ListComponent, TicketComponent, ...components],
  entryComponents: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BillingModule {}
