import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ListComponent } from './views/list/list.component';
import { TicketComponent } from './views/ticket/ticket.component';

const routes: Routes = [
  {
    path: 'ticket',
    component: TicketComponent,
  },
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class BillingRoutingModule {}
