import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private apiUrl = 'http://localhost:8080/api/gastos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): { headers: HttpHeaders } {
    const usuario = this.authService.obtenerUsuario();
    return {
      headers: new HttpHeaders({
        'X-USER-ID': usuario?.id?.toString() || ''
      })
    };
  }

  listarPorUsuario(idUsuario: number, admin: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}?admin=${admin}`, this.getHeaders());
  }

  registrarGasto(gasto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, gasto, this.getHeaders());
  }
    
  eliminarGasto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
