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
  categoriasTodas: string[] = []; // para “Todos”

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

        // Guardar todas las categorías originales
        this.categoriasTodas = [...new Set(this.movimientos.map(m => m.categoria))];
        this.categoriasUnicas = [...this.categoriasTodas];

        this.movimientosFiltrados = [...this.movimientos];
      },
      error: err => console.error('❌ Error al cargar movimientos:', err)
    });
  }

  // ✅ Filtrar movimientos y actualizar categorías dinámicamente
  aplicarFiltros(): void {
    // 1️⃣ Actualizar categorías según tipo seleccionado
    if (!this.filtroTipo || this.filtroTipo === 'todos') {
      this.categoriasUnicas = [...this.categoriasTodas];
    } else {
      this.categoriasUnicas = [
        ...new Set(this.movimientos
          .filter(m => m.tipo === this.filtroTipo)
          .map(m => m.categoria))
      ];
    }

    // Resetear categoría si ya no existe
    if (this.filtroCategoria && !this.categoriasUnicas.includes(this.filtroCategoria)) {
      this.filtroCategoria = '';
    }

    // 2️⃣ Filtrar movimientos para la tabla
    this.movimientosFiltrados = this.movimientos.filter(m => {
      if (this.filtroFechaDesde && m.fecha < new Date(this.filtroFechaDesde)) return false;
      if (this.filtroFechaHasta && m.fecha > new Date(this.filtroFechaHasta + 'T23:59:59')) return false;
      if (this.filtroTipo && this.filtroTipo !== 'todos' && m.tipo !== this.filtroTipo) return false;
      if (this.filtroCategoria && m.categoria !== this.filtroCategoria) return false;
      return true;
    });
  }

}
