// src/app/Auth/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.services';
import { AuthService } from '../../services/AuthService';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  dni = '';
  contrasena = '';
  mensaje = '';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    if (!this.dni || !this.contrasena) {
      this.mensaje = 'Por favor completa los campos.';
      return;
    }

    this.usuarioService.login(this.dni, this.contrasena).subscribe({
      next: (res: any) => {
  const usuario: Usuario = {
  id: res.id,
  nombre: res.nombre,
  dni: res.dni,
  correo: res.correo ?? "",
  telefono: res.telefono ?? "",
  contrasena: '',
  rol: res.rol,
  suscripcionActiva: res.suscripcionActiva === true,
};

        // Guarda en AuthService → actualiza navbar automáticamente
        this.authService.guardarUsuario(usuario);

        // Redirige según rol
        if (usuario.rol === 'SUPERADMIN') {
          this.router.navigate(['/gestor-usuarios']);
        } else if (usuario.rol === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/movimientos']);
        }
      },
      error: () => {
        this.mensaje = 'Credenciales incorrectas.';
      }
    });
  }
}
