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

}
