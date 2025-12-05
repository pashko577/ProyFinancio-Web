import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecordatoriosService, Recordatorio } from '../../services/recordatorio.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-recordatorios',
  standalone: true,
  imports: [CommonModule, DatePipe], // 🔹 agregamos DatePipe
  templateUrl: './recordatorios.html',
  styleUrls: ['./recordatorios.css'],
  providers: [DatePipe] // 🔹 necesario para pipes
})
export class RecordatoriosComponent implements OnInit {

  recordatorios: Recordatorio[] = [];
  mensaje: string = '';

  constructor(
    private recordatoriosService: RecordatoriosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) return;
    this.cargarRecordatorios(usuario.id);
  }

  cargarRecordatorios(idUsuario: number) {
    this.recordatoriosService.listarPorUsuario(idUsuario).subscribe({
      next: recs => this.recordatorios = recs,
      error: err => console.error('Error al cargar recordatorios:', err)
    });
  }
}
