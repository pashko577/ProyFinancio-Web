import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CajaModel } from '../models/caja.model';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private apiUrl = 'http://localhost:8080/api/caja';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): { headers: HttpHeaders } {
    const usuario = this.authService.obtenerUsuario();
    return {
      headers: new HttpHeaders({
        'X-USER-ID': usuario?.id?.toString() || ''
      })
    };
  }

  listar(): Observable<CajaModel[]> {
    return this.http.get<CajaModel[]>(this.apiUrl, this.getHeaders());
  }

  agregarFondo(data: any) {
    return this.http.post(`${this.apiUrl}/fondo`, data, this.getHeaders());
  }

  obtenerUltimaCaja(): Observable<CajaModel> {
    return this.http.get<CajaModel>(`${this.apiUrl}/ultima`, this.getHeaders());
  }

  agregarCierre(idCaja: number, data: any): Observable<CajaModel> {
    return this.http.put<CajaModel>(`${this.apiUrl}/cierre/${idCaja}`, data, this.getHeaders());
  }

  eliminar(idCaja: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCaja}`, this.getHeaders());
  }
}
