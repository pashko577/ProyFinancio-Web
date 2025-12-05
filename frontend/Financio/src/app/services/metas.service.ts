import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meta {
  id?: string;
  idUsuario: number;
  nombreMeta: string;
  montoObjetivo: number;
  acumulado: number;
  porcentaje: number;
  fechaLimite: string | null; // puede ser null
  activa: boolean;
}

@Injectable({ providedIn: 'root' })
export class MetasService {

  private apiUrl = 'http://localhost:8080/api/metas';

  constructor(private http: HttpClient) { }

  listarPorUsuario(idUsuario: number): Observable<Meta[]> {
    return this.http.get<Meta[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  registrar(meta: Meta): Observable<Meta> {

    // Convertir "" a null para evitar error en LocalDate
    const metaEnvio = {
      ...meta,
      fechaLimite: meta.fechaLimite === '' ? null : meta.fechaLimite
    };

    return this.http.post<Meta>(this.apiUrl, metaEnvio);
  }
 
  desactivar(idMeta: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${idMeta}/desactivar`, {});
  }
}
