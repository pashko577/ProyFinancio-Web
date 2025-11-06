import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.services'; // <-- revisa este path
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
  ) {}

  login(): void {
    if (!this.dni || !this.contrasena) {
      this.mensaje = 'Por favor completa los campos.';
      return;
    }

    this.usuarioService.login(this.dni, this.contrasena).subscribe({
      next: (usuario: Usuario) => {
        this.authService.guardarUsuario(usuario);
        this.mensaje = `Bienvenido, ${usuario.nombre}`;

        // Redirección según rol
        switch (usuario.rol) {
          case 'ADMIN':
            this.router.navigate(['/dashboard']);
            break;
          case 'EMPLEADO':
            this.router.navigate(['/movimientos']);
            break;
          default:
            this.router.navigate(['/dashboard']);
            break;
        }
      },
      error: () => {
        this.mensaje = 'Credenciales incorrectas.';
      }
    });
  }
}
