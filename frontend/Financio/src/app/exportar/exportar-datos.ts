import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { IngresoService } from '../services/ingreso.service';
import { GastoService } from '../services/gasto.service';
import { MovimientoService } from '../services/movimiento.service';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-exportar-datos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exportar-datos.html',
  styleUrls: ['./exportar-datos.css']
})
export class ExportarDatos implements OnInit {

  movimientos: any[] = [];

  tipoSeleccionado: string = 'TODOS';
  fechaDesde!: string;
  fechaHasta!: string;

  constructor(
    private ingresoService: IngresoService,
    private gastoService: GastoService,
    private movimientoService: MovimientoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario || !usuario.id) return;

    const userId = usuario.id;
    const isAdmin = usuario.rol === 'ADMIN';

    this.ingresoService.listarPorUsuario(userId, isAdmin).subscribe(ing => {
      const ingresos = ing.map((i: any) => ({
        fecha: i.fecha,
        tipo: "INGRESO",
        categoria: i.categoria?.nombre,
        monto: i.monto
      }));

      this.gastoService.listarPorUsuario(userId, isAdmin).subscribe(ga => {
        const gastos = ga.map((g: any) => ({
          fecha: g.fecha,
          tipo: "GASTO",
          categoria: g.categoria?.nombre,
          monto: g.monto
        }));

        this.movimientoService.listarPorUsuario(userId, isAdmin).subscribe(mv => {
          const movs = mv.map((m: any) => ({
            fecha: m.fecha,
            tipo: "MOVIMIENTO",
            categoria: m.categoria?.nombre,
            monto: m.monto
          }));

          this.movimientos = [...ingresos, ...gastos, ...movs];
          console.log("Datos cargados para exportación:", this.movimientos);
        });

      });

    });
  }

  get datosFiltrados() {
    return this.movimientos.filter(m => {
      const fecha = new Date(m.fecha);
      const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
      const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;

      const coincideTipo = this.tipoSeleccionado === 'TODOS' || m.tipo === this.tipoSeleccionado;
      const coincideFecha =
        (!desde || fecha >= desde) &&
        (!hasta || fecha <= hasta);

      return coincideTipo && coincideFecha;
    });
  }

  exportarExcel() {
    const ws = XLSX.utils.json_to_sheet(this.datosFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer]), 'reporte.xlsx');
  }

  exportarPDF() {
    const pdf = new jsPDF();
    pdf.text("Reporte Financiero", 14, 10);

    autoTable(pdf, {
      head: [['Fecha', 'Tipo', 'Categoría', 'Monto']],
      body: this.datosFiltrados.map(m => [
        new Date(m.fecha).toLocaleDateString(),
        m.tipo,
        m.categoria,
        m.monto
      ])
    });

    pdf.save('reporte.pdf');
  }

}
