import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.services';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    nombre: '',
    dni: '',
    correo: '',
    telefono: '',
    contrasena: '',
    rol: 'EMPLEADO'
  };
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al listar usuarios', err)
    });
  }

  registrarUsuario(form: NgForm): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena) {
      this.mensaje = 'Por favor completa los campos obligatorios.';
      return;
    }

    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: (data) => {
        this.mensaje = 'Usuario registrado correctamente ✅';
        this.usuarios.push(data);

        // ✅ Reinicia el formulario y el modelo
        form.resetForm({
          rol: 'EMPLEADO' // mantiene el valor por defecto
        });
      },
      error: (err) => {
        console.error('❌ Error al registrar usuario:', err);
        this.mensaje = 'Error al registrar usuario ❌';
      }
    });
  }
}
