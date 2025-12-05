import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago.model';

@Injectable({
    providedIn: 'root'
})
export class PagoService {

    private baseUrl = 'http://localhost:8080/pagos';

    constructor(private http: HttpClient) { }

    registrarPago(pago: Pago): Observable<Pago> {
        return this.http.post<Pago>(`${this.baseUrl}/guardar`, pago);
    }

    listarPagos(): Observable<Pago[]> {
        return this.http.get<Pago[]>(`${this.baseUrl}/lista`);
    }


    aprobarPago(idPago: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/aprobar/${idPago}`);
    }
    pagarConYape(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/pagos/guardar`, data);
    }

}
