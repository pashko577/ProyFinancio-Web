import { Injectable, signal, WritableSignal } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private STORAGE_KEY = 'usuario';
  usuario: WritableSignal<Usuario | null> = signal(this.obtenerUsuario());

  guardarUsuario(usuario: Usuario) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    this.usuario.set(usuario);
  }

  obtenerUsuario(): Usuario | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  cerrarSesion() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.usuario.set(null);
  }

  obtenerRol(): string | null {
    return this.usuario()?.rol ?? null;
  }
}
