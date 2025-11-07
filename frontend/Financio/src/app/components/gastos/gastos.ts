import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GastoService } from '../../services/gasto.service';
import { AuthService } from '../../services/AuthService';
import { CategoriasService } from '../../services/categorias.service';
import { MetodoPagoService } from '../../services/metodopago.service';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './gastos.html',
  styleUrls: ['./gastos.css']
})
export class Gastos implements OnInit {

  gastos: any[] = [];
  mensaje: string = '';

  categorias: any[] = [];
  metodosPago: any[] = [];

  nuevoGasto: any = {
    descripcion: '',
    monto: null,
    categoria: null,
    metodoPago: null
  };

  constructor(
    private gastoService: GastoService,
    private authService: AuthService,
    private categoriasService: CategoriasService,
    private metodoPagoService: MetodoPagoService
  ) { }

  // ✅ CARGA PRINCIPAL
  ngOnInit(): void {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario || !usuario.id) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }
    // 1) Cargar categorías
    this.categoriasService.getCategoriasPorUsuarioYTipo(usuario.id, "GASTO").subscribe({
      next: categorias => {
        this.categorias = categorias;

        // ✅ Ahora sí cargar métodos una sola vez
        this.cargarMetodosPago(Number(usuario.id));
      },
      error: err => console.error('❌ Error al cargar categorías:', err)
    });

  }


  // ✅ Cargar métodos de pago por usuario (OBLIGATORIO)
  cargarMetodosPago(usuarioId: number): void {
    this.metodoPagoService.listarMetodosPago(usuarioId).subscribe({
      next: metodos => {
        this.metodosPago = metodos;

        // 3) Cargar ingresos SOLO cuando categorías y métodos estén listos
        this.cargarGastos();
      },
      error: err => console.error('❌ Error al cargar métodos de pago:', err)
    });
  }
  // ✅ Cargar ingresos del usuario
  cargarGastos(): void {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario || !usuario.id) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    const esAdmin = usuario.rol === 'ADMIN';

    this.gastoService.listarPorUsuario(usuario.id, esAdmin).subscribe({
      next: data => {
        this.gastos = data.map(i => ({
          ...i,
          categoria: this.categorias.find(c => c.id === i.categoria?.id)?.nombre,
          metodoPago: this.metodosPago.find(m => m.id === i.metodoPago?.id)?.tipo || i.metodoPago?.tipo

        }));

        console.log("✅ gastos cargados:", this.gastos);
      },
      error: err => console.error('❌ Error al cargar gastos:', err)
    });
  }

  // ✅ Registrar ingreso
  registrarGasto(): void {
    console.log("✅ Categoria enviada:", this.nuevoGasto.categoria);
    console.log("✅ MetodoPago enviado:", this.nuevoGasto.metodoPago);

    const usuario = this.authService.obtenerUsuario();

    if (!usuario) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    const gasto = {
      descripcion: this.nuevoGasto.descripcion,
      monto: this.nuevoGasto.monto,
      categoria: { id: Number(this.nuevoGasto.categoria) },
      metodoPago: { id: Number(this.nuevoGasto.metodoPago) },
      usuario: { id: usuario.id },  // ✅ CORRECTO
      tipo: 'GASTO'
    };

    this.gastoService.registrarGasto(gasto).subscribe({
      next: data => {
        this.gastos.push({
          ...data,
          categoria: this.categorias.find(c => c.id === data.categoria?.id)?.nombre,
          metodoPago: this.metodosPago.find(m => m.id === data.metodoPago?.id)?.tipo

        });

        this.mensaje = '✅ gasto registrado correctamente.';
        this.nuevoGasto = { descripcion: '', monto: null, categoria: null, metodoPago: null };
      },
      error: err => {
        console.error('❌ Error al registrar gasto:', err);
        this.mensaje = '❌ Error al registrar gasto.';
      }
    });
  }

  // ✅ Eliminar ingreso
  eliminarGasto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este gasto?')) {
      this.gastoService.eliminarGasto(id).subscribe({
        next: () => {
          this.gastos = this.gastos.filter(i => i.id !== id);
          this.mensaje = '✅ gasto eliminado correctamente.';
        },
        error: err => {
          console.error('❌ Error al eliminar gasto:', err);
          this.mensaje = '❌ Error al eliminar gasto.';
        }
      });
    }
  }
}
