import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuscripcionService } from '../services/suscripcion.service';

@Component({
  selector: 'app-plans',
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  mostrarModal = false;
  planSeleccionado = '';
  idPlan = 0;
  nombre = '';
  correo = '';
  telefono = '';
  enviado = false;
  mensajeRespuesta = '';
  

  constructor(private suscripcionService: SuscripcionService) {}

  abrirFormulario(plan: string) {
    this.planSeleccionado = plan;
    this.idPlan = this.obtenerIdPlan(plan);
    this.mostrarModal = true;
    this.enviado = false;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
  }

  obtenerIdPlan(plan: string): number {
    switch (plan) {
      case 'Básico': return 1;
      case 'Emprendedor': return 2;
      case 'Empresarial': return 3;
      default: return 0;
    }
  }

  enviarFormulario() {
    const data = {
      idPlan: this.idPlan,
      nombreCliente: this.nombre,
      correo: this.correo,
      telefono: this.telefono
    };

    this.suscripcionService.suscribir(data).subscribe({
      next: (resp) => {
        this.enviado = true;
        this.mensajeRespuesta = resp.mensaje;
        setTimeout(() => this.cerrarModal(), 2000);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Hubo un problema al registrar la suscripción');
      }
    });
  }
}
