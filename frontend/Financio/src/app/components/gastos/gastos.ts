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
})
export class Gastos implements OnInit {
  gastos: any[] = [];
  nuevoGasto = {
    usuario: { id: 1 },  // ⚠️ Usa el ID del usuario logueado
    categoria: { id: 1 },
    metodoPago: { id: 1 },
    monto: null,
    descripcion: ''
  };

    metodosPago = [
    { id: 'EFECTIVO', nombre: 'Efectivo' },
    { id: 'TRANSFERENCIA_BANCARIA', nombre: 'Transferencia bancaria' },
    { id: 'DEPOSITO', nombre: 'Depósito' },
    { id: 'TARJETA_CREDITO', nombre: 'Tarjeta de crédito' },
    { id: 'TARJETA_DEBITO', nombre: 'Tarjeta de débito' },
    { id: 'YAPE_PLIN', nombre: 'Yape / Plin' },
    { id: 'OTRO', nombre: 'Otro' }
  ];


  categoriasGastos= [
    { id: 'VENTA_TIENDA', nombre: 'Ventas en tienda' },
    { id: 'VENTA_ONLINE', nombre: 'Ventas online' },
    { id: 'VENTA_REDES', nombre: 'Ventas por redes sociales' },
    { id: 'VENTA_MAYOR', nombre: 'Ventas al por mayor' },
    { id: 'PERSONALIZACION', nombre: 'Ingresos por personalización' },
    { id: 'OTROS_INGRESOS', nombre: 'Otros ingresos' }
  ];

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.cargarGastos();
  }

  cargarGastos(): void {
    const idUsuario = 1; // ⚠️ Puedes reemplazar con el usuario actual
    this.gastoService.listarPorUsuario(idUsuario).subscribe({
      next: data => this.gastos = data,
      error: err => console.error('Error al listar gastos', err)
    });
  }

  registrarGasto(): void {
    if (!this.nuevoGasto.monto) {
      alert('Debe ingresar un monto válido');
      return;
    }

    this.gastoService.registrarGasto(this.nuevoGasto).subscribe({
      next: _ => {
        alert('✅ Gasto registrado con éxito');
        this.nuevoGasto.monto = null;
        this.nuevoGasto.descripcion = '';
        this.cargarGastos();
      },
      error: err => console.error('Error al registrar gasto', err)
    });
  }

  eliminarGasto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este gasto?')) {
      this.gastoService.eliminarGasto(id).subscribe({
        next: _ => this.cargarGastos(),
        error: err => console.error('Error al eliminar gasto', err)
      });
    }
  }
}
