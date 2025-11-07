// src/app/services/categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getCategoriasPorUsuarioYTipo(idUsuario: number, tipo: string) {
  return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}/${tipo}`);
}

}