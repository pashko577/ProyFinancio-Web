import { Observable } from "rxjs";
import { Pago } from "../models/pago.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PagoService {

    private baseUrl = 'http://localhost:8080/api/pagos';

    constructor(private http: HttpClient) { }

    // Pago normal
    registrarPago(pago: Pago): Observable<Pago> {
        return this.http.post<Pago>(`${this.baseUrl}/guardar`, pago);
    }

    listarPagos(): Observable<Pago[]> {
        return this.http.get<Pago[]>(`${this.baseUrl}/lista`);
    }

    aprobarPago(idPago: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/aprobar/${idPago}`);
    }

    // 🔹 Yape
    iniciarPagoYape(data: { idUsuario: number; idPlan: number }): Observable<any> {
        return this.http.post(`${this.baseUrl}/yape`, data);
    }

  confirmarPagoYape(data: { idUsuario: number; idSuscripcion: number; monto: number; codigoOperacion: string; imagenComprobante: string; }): Observable<any> {
  return this.http.post(`${this.baseUrl}/yape/confirmar`, data);
}

}
