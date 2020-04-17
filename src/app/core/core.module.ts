import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api-interceptor.service';
import { LoginService } from './services/login.service';

const providers = [
  LoginService
];

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ...providers,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule {}
