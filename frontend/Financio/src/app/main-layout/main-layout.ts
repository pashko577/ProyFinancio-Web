import { Component,  OnInit } from '@angular/core';
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
export class MainLayout implements OnInit {

  mostrarModal = false; // Para el modal de cierre de sesión
  rol: string = '';
  nombreUsuario: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  const usuario = this.authService.obtenerUsuario();
  this.rol = usuario?.rol || '';
  this.nombreUsuario = usuario?.nombre || '';
}

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  // ✅ Aquí va el nuevo método
  irAPanel(): void {
    if (this.rol === 'SUPERADMIN') {
      this.router.navigate(['/gestor-usuarios']);
    } else if (this.rol === 'ADMIN') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/movimientos']);
    }
  }
  get esSuperadmin(): boolean {
    return this.rol === 'SUPERADMIN';
  }
}
