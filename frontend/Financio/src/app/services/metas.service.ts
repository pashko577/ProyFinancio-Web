import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

export interface Meta {
  id?: string;
  idUsuario: number;
  nombreMeta: string;
  montoObjetivo: number;
  acumulado: number;
  porcentaje: number;
  fechaLimite: string | null;
  activa: boolean;
}

@Injectable({ providedIn: 'root' })
export class MetasService {

  private apiUrl = 'http://localhost:8080/api/metas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): { headers: HttpHeaders } {
    const usuario = this.authService.obtenerUsuario();
    return {
      headers: new HttpHeaders({
        'X-USER-ID': usuario?.id?.toString() || ''
      })
    };
  }

  listarPorUsuario(idUsuario: number): Observable<Meta[]> {
    return this.http.get<Meta[]>(`${this.apiUrl}/usuario/${idUsuario}`, this.getHeaders());
  }

  registrar(meta: Meta): Observable<Meta> {
    const metaEnvio = {
      ...meta,
      fechaLimite: meta.fechaLimite === '' ? null : meta.fechaLimite
    };
    return this.http.post<Meta>(this.apiUrl, metaEnvio, this.getHeaders());
  }

  agregarAhorro(idMeta: string, monto: number): Observable<Meta> {
    return this.http.put<Meta>(`${this.apiUrl}/${idMeta}/acumulado?monto=${monto}`, {}, this.getHeaders());
  }

  desactivar(idMeta: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${idMeta}/desactivar`, {}, this.getHeaders());
  }
}
