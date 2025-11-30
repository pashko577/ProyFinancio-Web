import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  private apiUrl = 'http://localhost:8080/api/planes/suscribir';

  constructor(private http: HttpClient) {}

  suscribir(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
