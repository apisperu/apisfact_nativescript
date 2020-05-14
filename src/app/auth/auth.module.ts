import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LoginComponent } from './views/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [NativeScriptCommonModule, AuthRoutingModule, SharedModule],
  declarations: [LoginComponent],
  providers: [DatePipe],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
