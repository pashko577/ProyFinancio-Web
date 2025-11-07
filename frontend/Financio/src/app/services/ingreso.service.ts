// src/app/services/ingreso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private apiUrl = 'http://localhost:8080/api/ingresos';

  constructor(private http: HttpClient) {}

  // ✅ Cambiado a /registrar
  registrarIngreso(ingreso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, ingreso);
  }

  listarPorUsuario(idUsuario: number, admin: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}?admin=${admin}`);
  }

  eliminarIngreso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
