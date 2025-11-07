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

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarMetodosPago();
    this.cargarIngresos();
  }

  // 🔹 Cargar categorías desde BD
  cargarCategorias(): void {
    this.categoriasService.listarCategorias().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('❌ Error al cargar categorías:', err)
    });
  }

  // 🔹 Cargar métodos de pago desde BD
  cargarMetodosPago(): void {
    this.metodoPagoService.listarMetodosPago().subscribe({
      next: data => this.metodosPago = data,
      error: err => console.error('❌ Error al cargar métodos de pago:', err)
    });
  }

  cargarIngresos(): void {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario || !usuario.id) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    const esAdmin = usuario.rol === 'ADMIN';

    this.ingresoService.listarPorUsuario(usuario.id, esAdmin).subscribe({
      next: (data) => {
        this.ingresos = data.map(i => ({
          ...i,
          categoria: this.categorias.find(c => c.id === i.categoria?.id)?.nombre || i.categoria?.nombre,
          metodoPago: this.metodosPago.find(m => m.id === i.metodoPago?.id)?.nombre || i.metodoPago?.nombre
        }));

        console.log("✅ Ingresos cargados:", this.ingresos);
      },
      error: (err) => console.error('❌ Error al cargar ingresos:', err)
    });
  }

  registrarIngreso(): void {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      this.mensaje = '⚠️ No hay usuario autenticado.';
      return;
    }

    // 🔹 Enviar solo los id que coinciden con BD
    const ingreso = {
      descripcion: this.nuevoIngreso.descripcion,
      monto: this.nuevoIngreso.monto,
      categoria: { id: this.nuevoIngreso.categoria },
      metodoPago: { id: this.nuevoIngreso.metodoPago },
      usuario: { idUsuario: usuario.id },
      tipo: 'INGRESO'
    };

    this.ingresoService.registrarIngreso(ingreso).subscribe({
      next: (data) => {
        this.ingresos.push({
          ...data,
          categoria: this.categorias.find(c => c.id === data.categoria?.id)?.nombre,
          metodoPago: this.metodosPago.find(m => m.id === data.metodoPago?.id)?.nombre
        });

        this.mensaje = '✅ Ingreso registrado correctamente.';
        this.nuevoIngreso = { descripcion: '', monto: null, categoria: null, metodoPago: null };
      },
      error: (err) => {
        console.error('❌ Error al registrar ingreso:', err);
        this.mensaje = '❌ Error al registrar ingreso.';
      }
    });
  }

  eliminarIngreso(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este ingreso?')) {
      this.ingresoService.eliminarIngreso(id).subscribe({
        next: () => {
          this.ingresos = this.ingresos.filter(i => i.id !== id);
          this.mensaje = '✅ Ingreso eliminado correctamente.';
        },
        error: (err) => {
          console.error('❌ Error al eliminar ingreso:', err);
          this.mensaje = '❌ Error al eliminar ingreso.';
        }
      });
    }
  }
}
