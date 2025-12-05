import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aporte {
  idMeta: string;
  monto: number;
}

@Injectable({ providedIn: 'root' })
export class AportesService {
  private url = 'http://localhost:8080/api/aportes';

  constructor(private http: HttpClient) {}

  registrarAporte(aporte: Aporte): Observable<Aporte> {
    return this.http.post<Aporte>(this.url, aporte);
  }
  // Nuevo: obtener acumulado por meta
  getAcumulado(idMeta: string): Observable<number> {
    return this.http.get<number>(`${this.url}/acumulado/${idMeta}`);
  }
}

