import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestor-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-usuarios.html',
  styleUrls: ['./gestor-usuarios.css']
})
export class GestorUsuarios implements OnInit {
  
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  eliminar(id: number) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  asignarAdmin(id: number) {
    this.usuarioService.asignarRolAdmin(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  asignarSuperadmin(id: number) {
    this.usuarioService.asignarRolSuperadmin(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }
}
