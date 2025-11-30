// src/app/components/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.obtenerRol() === 'ADMIN') return true;
    alert('❌ No tienes permisos para esta página');
    this.router.navigate(['/dashboard']); // redirige a dashboard si no es admin
    return false;
  }
}
