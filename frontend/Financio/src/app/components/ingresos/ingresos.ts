import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresoService } from '../../services/ingreso.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingresos.html',
  styleUrls: ['./ingresos.css']
})
export class Ingresos implements OnInit {

  ingresos: any[] = [];
  mensaje: string = '';
  nuevoIngreso: any = {
    descripcion: '',
    monto: null,
    categoria: null,
    metodoPago: null
  };

  constructor(
    private ingresoService: IngresoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarIngresos();
  }
cargarIngresos(): void {
  const usuario = this.authService.obtenerUsuario();

  // 🧠 Validación robusta:
  if (!usuario || !usuario.id) {
    this.mensaje = '⚠️ No hay usuario autenticado.';
    console.warn('Usuario inválido:', usuario);
    return;
  }

  const esAdmin = usuario.rol === 'ADMIN';

  this.ingresoService.listarPorUsuario(usuario.id, esAdmin).subscribe({
    next: (data) => this.ingresos = data,
    error: (err) => console.error('❌ Error al cargar ingresos:', err)
  });
}


  registrarIngreso(): void {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      this.mensaje = 'No hay usuario autenticado.';
      return;
    }

    const ingreso = {
      ...this.nuevoIngreso,
      usuario: { id: usuario.id },
      tipo: 'INGRESO'
    };

    this.ingresoService.registrarIngreso(ingreso).subscribe({
      next: (data) => {
        this.ingresos.push(data);
        this.mensaje = '✅ Ingreso registrado correctamente.';
        this.nuevoIngreso = { descripcion: '', monto: null, categoria: null, metodoPago: null };
      },
      error: (err) => {
        console.error('❌ Error al registrar ingreso:', err);
        this.mensaje = 'Error al registrar ingreso.';
      }
    });
  }

  eliminarIngreso(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este ingreso?')) {
      this.ingresoService.eliminarIngreso(id).subscribe({
        next: () => {
          this.ingresos = this.ingresos.filter(i => i.id !== id);
          this.mensaje = 'Ingreso eliminado correctamente.';
        },
        error: (err) => {
          console.error('❌ Error al eliminar ingreso:', err);
          this.mensaje = 'Error al eliminar ingreso.';
        }
      });
    }
  }
}
