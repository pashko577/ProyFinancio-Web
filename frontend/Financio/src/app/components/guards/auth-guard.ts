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
    if (this.authService.estaAutenticado()) {
      return true;
    }
    alert('❌ Debes iniciar sesión para acceder a esta página');
    this.router.navigate(['/login']);
    return false;
  }
}
