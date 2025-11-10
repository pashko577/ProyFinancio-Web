import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meta {
  id?: string;
  idUsuario: number;
  nombre: string;
  montoObjetivo: number;
  acumulado: number;
  porcentaje: number;
  fechaLimite: string; // ISO string 'yyyy-MM-dd'
  activa: boolean;
}
  
@Injectable({ providedIn: 'root' })
export class MetasService {

  private apiUrl = 'http://localhost:8080/api/metas';

  constructor(private http: HttpClient) {}

  listarPorUsuario(idUsuario: number): Observable<Meta[]> {
    return this.http.get<Meta[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  registrar(meta: Meta): Observable<Meta> {
    // Asegurarse que la fecha sea string ISO 'yyyy-MM-dd'
    const metaEnvio = { ...meta, fechaLimite: meta.fechaLimite };
    return this.http.post<Meta>(this.apiUrl, metaEnvio);
  }

  agregarAhorro(idMeta: string, monto: number): Observable<Meta> {
    return this.http.put<Meta>(`${this.apiUrl}/${idMeta}/acumulado?monto=${monto}`, {});
  }

  desactivar(idMeta: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${idMeta}/desactivar`, {});
  }
}
