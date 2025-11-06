// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  guardarUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? (JSON.parse(data) as Usuario) : null;
  }

  estaAutenticado(): boolean {
    return !!this.obtenerUsuario();
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
  }

  obtenerRol(): string | null {
    const usuario = this.obtenerUsuario();
    return usuario?.rol ?? null;
  }
}
