import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IngresoService } from '../../services/ingreso.service';
import { AuthService } from '../../services/AuthService';
import { CategoriasService } from '../../services/categorias.service';
import { MetodoPagoService } from '../../services/metodopago.service';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ingresos.html',
  styleUrls: ['./ingresos.css']
})
export class Ingresos implements OnInit {

  ingresos: any[] = [];
  mensaje: string = '';

  categorias: any[] = [];
  metodosPago: any[] = [];

  nuevoIngreso: any = {
    descripcion: '',
    monto: null,
    categoria: null,
    metodoPago: null
  };

  constructor(
    private ingresoService: IngresoService,
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
    this.categoriasService.getCategoriasPorUsuarioYTipo(usuario.id, "INGRESO").subscribe({
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
        this.cargarIngresos();
      },
      error: err => console.error('❌ Error al cargar métodos de pago:', err)
    });
  }

  // ✅ Cargar ingresos del usuario
  cargarIngresos(): void {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario || !usuario.id) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    const esAdmin = usuario.rol === 'ADMIN';

    this.ingresoService.listarPorUsuario(usuario.id, esAdmin).subscribe({
      next: data => {
        this.ingresos = data.map(i => ({
          ...i,
          categoria: this.categorias.find(c => c.id === i.categoria?.id)?.nombre,
          metodoPago: this.metodosPago.find(m => m.id === i.metodoPago?.id)?.tipo || i.metodoPago?.tipo

        }));

        console.log("✅ Ingresos cargados:", this.ingresos);
      },
      error: err => console.error('❌ Error al cargar ingresos:', err)
    });
  }

  // ✅ Registrar ingreso
  registrarIngreso(): void {
    console.log("✅ Categoria enviada:", this.nuevoIngreso.categoria);
    console.log("✅ MetodoPago enviado:", this.nuevoIngreso.metodoPago);

    const usuario = this.authService.obtenerUsuario();

    if (!usuario) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    const ingreso = {
      descripcion: this.nuevoIngreso.descripcion,
      monto: this.nuevoIngreso.monto,
      categoria: { id: Number(this.nuevoIngreso.categoria) },
      metodoPago: { id: this.nuevoIngreso.metodoPago }, // ya es number
      usuario: { id: usuario.id },
      tipo: 'INGRESO'
    };

    this.ingresoService.registrarIngreso(ingreso).subscribe({
      next: data => {
        this.ingresos.push({
          ...data,
          categoria: this.categorias.find(c => c.id === data.categoria?.id)?.nombre,
          metodoPago: this.metodosPago.find(m => m.id === data.metodoPago?.id)?.tipo

        });

        this.mensaje = '✅ Ingreso registrado correctamente.';
        this.nuevoIngreso = { descripcion: '', monto: null, categoria: null, metodoPago: null };
      },
      error: err => {
        console.error('❌ Error al registrar ingreso:', err);
        this.mensaje = '❌ Error al registrar ingreso.';
      }
    });
  }

  // ✅ Eliminar ingreso
  eliminarIngreso(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este ingreso?')) {
      this.ingresoService.eliminarIngreso(id).subscribe({
        next: () => {
          this.ingresos = this.ingresos.filter(i => i.id !== id);
          this.mensaje = '✅ Ingreso eliminado correctamente.';
        },
        error: err => {
          console.error('❌ Error al eliminar ingreso:', err);
          this.mensaje = '❌ Error al eliminar ingreso.';
        }
      });
    }
  }
}
