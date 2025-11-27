import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CajaModel } from '../models/caja.model';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private apiUrl = 'http://localhost:8080/api/cajas';

  constructor(private http: HttpClient) {}

  listar(): Observable<CajaModel[]> {
    return this.http.get<CajaModel[]>(this.apiUrl);
  }

  agregarFondo(caja: CajaModel): Observable<CajaModel> {
    return this.http.post<CajaModel>(`${this.apiUrl}/fondo`, caja);
  }

  agregarCierre(idCaja: number, cierre: number): Observable<CajaModel> {
    return this.http.put<CajaModel>(`${this.apiUrl}/cierre/${idCaja}`, { cierre });
  }

  eliminar(idCaja: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCaja}`);
  }
}
