import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://localhost:8080/api/movimientos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): { headers: HttpHeaders } {
    const usuario = this.authService.obtenerUsuario();
    return {
      headers: new HttpHeaders({
        'X-USER-ID': usuario?.id?.toString() || ''
      })
    };
  }

  listarPorUsuario(idUsuario: number, esAdmin: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}?admin=${esAdmin}`, this.getHeaders());
  }
}
