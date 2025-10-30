import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plans',
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  mostrarModal = false;
  planSeleccionado = '';
  nombre = '';
  correo = '';
  telefono = '';
  enviado = false;

  abrirFormulario(plan: string) {
    this.planSeleccionado = plan;
    this.mostrarModal = true;
    this.enviado = false;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  enviarFormulario() {
    this.enviado = true;
    setTimeout(() => this.cerrarModal(), 2000);
  }
}
