// src/app/components/guards/auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Si hay un usuario logueado (usuario signal no es null)
    if (this.authService.usuario()) {
      return true;
    }

    // Si no hay usuario, redirige a login
    this.router.navigate(['/login']);
    return false;
  }
}
