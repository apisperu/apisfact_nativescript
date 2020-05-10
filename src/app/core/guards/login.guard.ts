import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: RouterExtensions
  ) {}

  canActivate() {
    if (this.loginService.isLogged()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
