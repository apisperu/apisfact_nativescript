import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    if (this.loginService.isLogged()) {
      console.log('Ya estás logueado');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
