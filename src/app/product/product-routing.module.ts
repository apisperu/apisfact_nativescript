import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ListComponent } from './views/list/list.component';
import { NewComponent } from './views/new/new.component';
import { EditComponent } from './views/edit/edit.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: NewComponent },
  { path: ':id', component: EditComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ProductRoutingModule {}
