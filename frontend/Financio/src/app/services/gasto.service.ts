  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class GastoService {

  private apiUrl = 'http://localhost:8080/api/gastos';


    constructor(private http: HttpClient) {}

  listarPorUsuario(idUsuario: number, admin: boolean = false): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}?admin=${admin}`);
    }

    registrarGasto(gasto: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/registrar`, gasto);
    }
    
    eliminarGasto(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
