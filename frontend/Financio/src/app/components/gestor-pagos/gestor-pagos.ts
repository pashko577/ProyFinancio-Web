import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-gestor-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-pagos.html',
  styleUrls: ['./gestor-pagos.css']
})
export class GestorPagos implements OnInit {

  pagos: any[] = [];
  mensaje: string = '';

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos() {
    this.pagoService.listarPagos().subscribe({
      next: (res: any) => {
        this.pagos = res;
      },
      error: err => {
        console.error('❌ Error al cargar pagos:', err);
        this.mensaje = '❌ Error al cargar pagos.';
      }
    });
  }

  aprobarPago(idPago: number) {
    if (confirm("¿Seguro que deseas aprobar este pago?")) {
      this.pagoService.aprobarPago(idPago).subscribe({
        next: () => {
          this.mensaje = '✅ Pago aprobado correctamente.';
          this.cargarPagos();
        },
        error: err => {
          console.error('❌ Error al aprobar pago:', err);
          this.mensaje = '❌ Error al aprobar pago.';
        }
      });
    }
  }

}
