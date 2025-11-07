import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovimientoService } from '../../services/movimiento.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './movimientos.html',
  styleUrls: ['./movimientos.css']
})
export class Movimientos implements OnInit {

  movimientos: any[] = [];
  movimientosFiltrados: any[] = [];

  mensaje: string = '';

  // ✅ Filtros
  filtroFechaDesde: string = '';
  filtroFechaHasta: string = '';
  filtroTipo: string = '';
  filtroCategoria: string = '';

  categoriasUnicas: string[] = [];

  constructor(
    private movimientoService: MovimientoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario || !usuario.id) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    const esAdmin = usuario.rol === "ADMIN";

    this.movimientoService.listarPorUsuario(usuario.id, esAdmin).subscribe({
      next: data => {
        this.movimientos = data.map(m => ({
          ...m,
          fecha: m.fecha ? new Date(m.fecha) : null,
          categoria: m.categoria?.nombre,
          metodoPago: m.metodoPago?.tipo
        }));

        // ✅ Categorías únicas para el select
        this.categoriasUnicas = [...new Set(this.movimientos.map(m => m.categoria))];

        this.movimientosFiltrados = [...this.movimientos];
      },
      error: err => console.error('❌ Error al cargar movimientos:', err)
    });
  }

  // ✅ Filtrar correctamente por rango de fechas + tipo + categoría
  aplicarFiltros(): void {
    this.movimientosFiltrados = this.movimientos.filter(m => {

      // Fecha desde
      if (this.filtroFechaDesde && m.fecha < new Date(this.filtroFechaDesde)) {
        return false;
      }

      // Fecha hasta (incluye todo el día)
      if (this.filtroFechaHasta && m.fecha > new Date(this.filtroFechaHasta + 'T23:59:59')) {
        return false;
      }

      // Tipo
      if (this.filtroTipo && m.tipo !== this.filtroTipo) {
        return false;
      }

      // Categoría
      if (this.filtroCategoria && m.categoria !== this.filtroCategoria) {
        return false;
      }

      return true;
    });
  }
}
