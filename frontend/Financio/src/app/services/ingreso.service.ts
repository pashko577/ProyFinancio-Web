// src/app/services/ingreso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private apiUrl = 'http://localhost:8080/api/ingresos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const usuario = this.authService.obtenerUsuario();
    return new HttpHeaders({
      'X-USER-ID': usuario?.id ? usuario.id.toString() : ''
    });
  }

  registrarIngreso(ingreso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, ingreso, { headers: this.getHeaders() });
  }

  listarPorUsuario(idUsuario: number, admin: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}?admin=${admin}`, { headers: this.getHeaders() });
  }

  eliminarIngreso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
