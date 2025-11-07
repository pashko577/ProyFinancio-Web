import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService';
import { HttpClientModule } from '@angular/common/http';


@Component({
  
standalone:true,
  imports:[CommonModule,FormsModule, HttpClientModule],
  selector: 'app-gastos',
  templateUrl: './gastos.html',
  styleUrls: ['./gastos.css']
})export class Gastos implements OnInit {
  gastos: any[] = [];
  mensaje: string | null = null;   // ✅ PROPIEDAD FALTANTE

  nuevoGasto = {
    usuario: { id: 1 },
    categoria: { id: 1 },
    metodoPago: { id: 1 },
    monto: null,
    descripcion: ''
  };

  metodosPago = [
    { id: '1', nombre: 'Efectivo' },
    { id: '2', nombre: 'Transferencia bancaria' },
    { id: '3', nombre: 'Depósito' },
    { id: '4', nombre: 'Tarjeta de crédito' },
    { id: '5', nombre: 'Tarjeta de débito' },
    { id: '6', nombre: 'Yape / Plin' },
    { id: '7', nombre: 'Otro' }
  ];

  categoriasGastos= [
    { id: '7', nombre: 'Alquiler' },
    { id: '8', nombre: 'Servicios básicos' },
    { id: '9', nombre: 'Publicidad y marketing' },
    { id: '10', nombre: 'Sueldos y salarios' },
    { id: '11', nombre: 'Insumos y materiales' },
     { id: '12', nombre: 'Transporte' },
    { id: '13', nombre: 'Otros gastos' }
  ];

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.cargarGastos();
  }

  cargarGastos(): void {
    const idUsuario = 1;
    this.gastoService.listarPorUsuario(idUsuario).subscribe({
      next: data => this.gastos = data,
      error: err => console.error('Error al listar gastos', err)
    });
  }

  registrarGasto(): void {
    if (!this.nuevoGasto.monto) {
      this.mensaje = 'Debe ingresar un monto válido';
      return;
    }

    this.gastoService.registrarGasto(this.nuevoGasto).subscribe({
      next: _ => {
        this.mensaje = '✅ Gasto registrado con éxito';

        // limpiar formulario
        this.nuevoGasto.monto = null;
        this.nuevoGasto.descripcion = '';
        this.cargarGastos();

        // ocultar mensaje automáticamente
        setTimeout(() => (this.mensaje = null), 3000);
      },
      error: err => {
        this.mensaje = '❌ Error al registrar gasto';
        console.error(err);
      }
    });
  }

  eliminarGasto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este gasto?')) {
      this.gastoService.eliminarGasto(id).subscribe({
        next: _ => {
          this.mensaje = '✅ Gasto eliminado';
          this.cargarGastos();
          setTimeout(() => (this.mensaje = null), 3000);
        },
        error: err => {
          this.mensaje = '❌ Error al eliminar gasto';
          console.error(err);
        }
      });
    }
  }
}
 