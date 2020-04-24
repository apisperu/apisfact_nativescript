import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [LoginGuard],
  },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule',
  },
  {
    path: 'client',
    loadChildren: './client/client.module#ClientModule',
  },
  {
    path: 'billing',
    loadChildren: './billing/billing.module#BillingModule',
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
