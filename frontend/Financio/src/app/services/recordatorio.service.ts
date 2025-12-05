    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';

    export interface Recordatorio {
    id?: number;
    idMeta: string;
    idUsuario: number;
    mensaje: string;
    fechaRecordatorio: string; // ISO string
    enviado: boolean;
    creado?: string;
    }

    @Injectable({ providedIn: 'root' })
    export class RecordatoriosService {

    private apiUrl = 'http://localhost:8080/api/recordatorios';

    constructor(private http: HttpClient) {}

    listarPorUsuario(idUsuario: number): Observable<Recordatorio[]> {
        return this.http.get<Recordatorio[]>(`${this.apiUrl}/usuario/${idUsuario}`);
    }

    crear(recordatorio: Recordatorio): Observable<Recordatorio> {
        return this.http.post<Recordatorio>(this.apiUrl, recordatorio);
    }

    marcarEnviado(id: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}/enviado`, {});
    }
    }
