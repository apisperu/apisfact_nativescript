import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './view/login.component';
import { LoginPresenter } from './presenter/login.presenter';

@NgModule({
  imports: [NativeScriptCommonModule, LoginRoutingModule],
  declarations: [LoginComponent],
  providers: [LoginPresenter],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
