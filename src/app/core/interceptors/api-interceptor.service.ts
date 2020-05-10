import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RouterExtensions } from 'nativescript-angular/router';

import { AppStateService } from '../services/app-state.service';
import { LoaderService } from '../services/loader.service';
import { LoginService } from '../services/login.service';

const BASE_URL = 'https://facturacion.apisperu.com/api/v1/';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private appState: AppStateService,
    private loginService: LoginService,
    private router: RouterExtensions,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.appState.get('accessToken');
    this.loaderService.showLoader();
    if (authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }

    request = request.clone({
      url: `${BASE_URL}${request.url}`,
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      catchError((error) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  private handleError(res: HttpErrorResponse): any {
    if (res.status === 401) {
      this.router.navigate(['login']);
    } else {
      this.loginService.logout();
    }
    return throwError(res.error);
  }
}
