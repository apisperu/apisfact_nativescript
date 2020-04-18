import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ListComponent } from './views/list/list.component';
import { NewComponent } from './views/new/new.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: NewComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class CompanyRoutingModule {}
