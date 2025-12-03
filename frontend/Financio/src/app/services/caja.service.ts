import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CajaModel } from '../models/caja.model';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private apiUrl = 'http://localhost:8080/api/caja';

  constructor(private http: HttpClient) {}

  listar(): Observable<CajaModel[]> {
  return this.http.get<CajaModel[]>(this.apiUrl);
}

agregarFondo(data: any) {
  return this.http.post(`${this.apiUrl}/fondo`, data);
}

obtenerUltimaCaja(): Observable<CajaModel> {
  return this.http.get<CajaModel>(`${this.apiUrl}/ultima`);
}

  agregarCierre(idCaja: number, data: any): Observable<CajaModel> {
  return this.http.put<CajaModel>(`${this.apiUrl}/cierre/${idCaja}`, data);
}

  eliminar(idCaja: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCaja}`);
  }
}
