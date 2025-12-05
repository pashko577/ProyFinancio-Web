import { Component, effect } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/AuthService';
import { Footer } from './Shared/footer/footer';
import { CommonModule } from '@angular/common';
import { ConfirmModal } from "./components/modals/confirm-modal";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Footer, ConfirmModal],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  nombreUsuario = '';
  rol = '';


  constructor(public authService: AuthService, private router: Router) {
    // Efecto reactivo: cuando cambia el usuario en AuthService, actualiza navbar
    effect(() => {
      const usuario = this.authService.usuario();
      this.nombreUsuario = usuario?.nombre || '';
      this.rol = usuario?.rol || '';
    });
  }
  mostrarModal = false; // controla visibilidad del modal

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  logout() {
    this.authService.cerrarSesion();
    this.cerrarModal();
    this.router.navigate(['/login']);
  }

irAPanel() {
  const usuario = this.authService.usuario();
  if (!usuario) {
    alert('Debes iniciar sesión primero');
    this.router.navigate(['/login']);
    return;
  }

  // ✅ Comprobar suscripción
  if (!this.authService.tieneSuscripcionActiva()) {
    alert('Debes adquirir un plan para acceder a este módulo');
    this.router.navigate(['/plans']); // Redirige al apartado de planes
    return;
  }

  // Navegación según rol
  switch (usuario.rol) {
    case 'SUPERADMIN':
      this.router.navigate(['/gestor-usuarios']);
      break;
    case 'ADMIN':
      this.router.navigate(['/usuarios']); // o el panel de admin correspondiente
      break;
    default:
      this.router.navigate(['/movimientos']);
  }
}

  
  get mostrarBotonPanel(): boolean {
    // Rutas públicas
    const rutasPublicas = ['/', '/services', '/contact', '/plans'];
    return this.nombreUsuario !== '' && rutasPublicas.includes(this.router.url);
  }
}
