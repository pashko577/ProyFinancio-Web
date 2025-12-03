// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registrar`, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // ✅ Nuevo: login
  login(dni: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { dni, contrasena });
  }

  // Nuevo: asignar rol ADMIN
  asignarRolAdmin(idUsuario: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/admin/${idUsuario}`, {});
  }

  //obtener usuario
  obtenerUsuario(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
