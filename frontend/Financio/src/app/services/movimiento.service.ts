import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://localhost:8080/api/movimientos';

  constructor(private http: HttpClient) {}

  listarPorUsuario(idUsuario: number, esAdmin: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}?admin=${esAdmin}`);
  }
}
