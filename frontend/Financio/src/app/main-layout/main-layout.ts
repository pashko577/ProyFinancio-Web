import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout {

  mostrarModal = false; // <--- necesario para mostrar/ocultar el modal

  constructor(private authService: AuthService, private router: Router) {}

  get rol(): string | null {
    return this.authService.obtenerRol();
  }

  // Se activa cuando el usuario presiona "Cerrar sesión" en el menú
  abrirModal(): void {
    this.mostrarModal = true;
  }

  // Botón "Cancelar"
  cerrarModal(): void {
    this.mostrarModal = false;
  }

  // Botón "Sí, cerrar sesión"
  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
