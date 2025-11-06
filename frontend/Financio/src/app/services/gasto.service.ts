import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

 private apiUrl = 'http://localhost:8080/api/gastos';


  constructor(private http: HttpClient) {}

listarPorUsuario(idUsuario: number) {
  return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
}

  registrarGasto(gasto: any) {
    return this.http.post<any>(`${this.apiUrl}/registrar`, gasto);
  }

  eliminarGasto(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
