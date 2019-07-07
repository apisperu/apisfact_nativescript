import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './view/login.component';
import { LoginPresenter } from './presenter/login.presenter';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [NativeScriptCommonModule, LoginRoutingModule, SharedModule],
  declarations: [LoginComponent],
  providers: [LoginPresenter],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
