import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Importa esto
@Component({
  selector: 'app-movimientos',
  imports: [CommonModule,FormsModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css',
})
export class Movimientos implements OnInit {
  movimientos: any[] = [];
  nuevoMovimiento = {
    tipo: 'INGRESO',
    descripcion: '',
    monto: 0
  };

  mensaje: string = '';

  ngOnInit(): void {
    // En el futuro: aquí cargaremos los movimientos desde el backend
    this.movimientos = [
      { id: 1, tipo: 'INGRESO', descripcion: 'Pago recibido', monto: 1200 },
      { id: 2, tipo: 'EGRESO', descripcion: 'Compra insumos', monto: 300 }
    ];
  }

  registrarMovimiento() {
    if (!this.nuevoMovimiento.descripcion || this.nuevoMovimiento.monto <= 0) {
      this.mensaje = 'Por favor completa todos los campos correctamente.';
      return;
    }

    const nuevo = {
      id: this.movimientos.length + 1,
      ...this.nuevoMovimiento
    };

    this.movimientos.push(nuevo);
    this.mensaje = 'Movimiento registrado correctamente ✅';
    this.nuevoMovimiento = { tipo: 'INGRESO', descripcion: '', monto: 0 };
  }
}
