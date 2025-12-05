import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    const usuario = this.authService.usuario()

    // 1️⃣ Verifica si existe sesión
    if (!usuario) {
      alert("Primero debes iniciar sesión.");
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Verifica si su suscripción está activa
    if (!usuario.suscripcionActiva) {
      alert("Debes adquirir un plan para acceder a este módulo");
     this.router.navigate(['/plans']);
      return false;
    }

    return true; // OK
  }
}
