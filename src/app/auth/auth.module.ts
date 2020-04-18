import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LoginComponent } from './views/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, AuthRoutingModule],
  declarations: [LoginComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
