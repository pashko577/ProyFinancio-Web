import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.services';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminUser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminUser.html',
  styleUrls: ['./adminUser.css']
})
export class AdminUser implements OnInit {

  usuarios: Usuario[] = [];
  mensaje = '';
  // propiedad para crear un nuevo usuario
  nuevoUsuario: Usuario = {
    nombre: '',
    dni: '',
    correo: '',
    telefono: '',
    contrasena: '',
    rol: 'EMPLEADO' // por defecto
  };

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: () => this.mensaje = 'Error al cargar usuarios'
    });
  }

  asignarAdmin(usuario: Usuario) {
    this.usuarioService.asignarRolAdmin(usuario.id!).subscribe({
      next: u => {
        usuario.rol = u.rol; // Actualiza el rol en la tabla
        this.mensaje = `${usuario.nombre} ahora es ADMIN`;
      },
      error: () => this.mensaje = 'Error al asignar rol ADMIN'
    });
  }
   registrarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.dni || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena) {
      this.mensaje = 'Completa todos los campos obligatorios';
      return;
    }

    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: u => {
        this.mensaje = `Usuario ${u.nombre} creado correctamente!`;
        this.cargarUsuarios();
        this.nuevoUsuario = { nombre: '', dni: '', correo: '', telefono: '', contrasena: '', rol: 'EMPLEADO' };
      },
      error: e => this.mensaje = e.error?.mensaje || 'Error al registrar usuario'
    });
  }
}
