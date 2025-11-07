import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necesario para *ngFor, *ngIf
import { MovimientoService } from '../services/movimiento.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule], // ✅ Importado
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard  implements OnInit {

  movimientos: any[] = [];
  totalIngresos = 0;
  totalGastos = 0;
  balance = 0;

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // ✅ Cargar todos los movimientos como admin
    this.movimientoService.listarPorUsuario(0, true).subscribe(data => {

      this.movimientos = data.map(m => ({
        ...m,
        fecha: m.fecha ? new Date(m.fecha) : null,
        categoria: m.categoria?.nombre
      }));

      this.calcularTotales();
      this.graficoIngresosVsGastos();
      this.graficoGastosPorCategoria();
    });
  }

  calcularTotales() {
    this.totalIngresos = this.movimientos
      .filter(m => m.tipo === 'INGRESO')
      .reduce((t, m) => t + m.monto, 0);

    this.totalGastos = this.movimientos
      .filter(m => m.tipo === 'GASTO')
      .reduce((t, m) => t + m.monto, 0);

    this.balance = this.totalIngresos - this.totalGastos;
  }

  graficoIngresosVsGastos() {
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const ingresosMes = Array(12).fill(0);
    const gastosMes = Array(12).fill(0);

    this.movimientos.forEach(m => {
      const mes = m.fecha?.getMonth();
      if (mes !== undefined) {
        if (m.tipo === 'INGRESO') ingresosMes[mes] += m.monto;
        else gastosMes[mes] += m.monto;
      }
    });

    new Chart('chartIG', {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          { label: 'Ingresos', data: ingresosMes, backgroundColor: 'green' },
          { label: 'Gastos', data: gastosMes, backgroundColor: 'red' }
        ]
      }
    });
  }

  graficoGastosPorCategoria() {
    const categorias = [...new Set(this.movimientos.map(m => m.categoria))];
    const montos = categorias.map(cat =>
      this.movimientos
        .filter(m => m.categoria === cat && m.tipo === 'GASTO')
        .reduce((t, m) => t + m.monto, 0)
    );

    new Chart('chartCategorias', {
      type: 'doughnut',
      data: {
        labels: categorias,
        datasets: [
          { data: montos, backgroundColor: ['#ff6384','#36a2eb','#ffce56','#4bc0c0','#9966ff'] }
        ]
      }
    });
  }
}
