import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api-interceptor.service';
import { LoginService } from './services/login.service';
import { CompanyService } from './services/company.service';
import { LoginGuard } from './guards/login.guard';
import { FilePickerService } from './services/file-picker.service';

const providers = [LoginService, CompanyService, LoginGuard, FilePickerService];

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ...providers,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule {}
