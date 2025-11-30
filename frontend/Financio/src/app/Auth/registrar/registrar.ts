import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.services';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar.html',
  styleUrls: ['./registrar.css']
})
export class Registrar {
  nombre = '';
  dni = '';
  correo = '';
  telefono = '';
  contrasena = '';
  mensaje = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  registrar() {
    if (!this.nombre || !this.dni || !this.correo || !this.contrasena) {
      this.mensaje = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: this.nombre,
      dni: this.dni,
      correo: this.correo,
      telefono: this.telefono,
      contrasena: this.contrasena,
      rol: ''
    };

    this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
      next: (response: any) => {
        this.mensaje = response.mensaje || 'Usuario registrado correctamente';

        // Limpiar formulario
        this.nombre = '';
        this.dni = '';
        this.correo = '';
        this.telefono = '';
        this.contrasena = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        if (err.status === 400) {
          this.mensaje = err.error?.error || 'El usuario ya está registrado.';
        } else {
          this.mensaje = 'Error inesperado. Inténtalo nuevamente.';
        }
      }
    });
  }
}
