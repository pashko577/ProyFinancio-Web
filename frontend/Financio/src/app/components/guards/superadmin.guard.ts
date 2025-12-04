import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const rol = this.authService.obtenerRol();

    if (rol === 'SUPERADMIN') {
      return true;
    }

    alert('❌ Solo SUPERADMIN puede acceder a esta página');
    this.router.navigate(['/gestor-usuarios']);
    return false;
  }
}
