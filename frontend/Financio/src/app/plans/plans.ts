import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuscripcionService } from '../services/suscripcion.service';
import { PagoService } from '../services/pago.service';

import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plans.html',
  styleUrls: ['./plans.css'],
})
export class Plans {

  mostrarModal = false;

  // Suscripción
  planSeleccionado = '';
  idPlan = 0;
  nombre = '';
  correo = '';
  telefono = '';
  suscripcionRegistradaId = 0;

  // Pago Yape
  mostrarPago = false;
  montoPago = 0;
  codigoOperacion = '';
  imagenComprobante: string = '';

  // UI
  enviado = false;
  mensajeRespuesta = '';

  constructor(
    private suscripcionService: SuscripcionService,
    private pagoService: PagoService,
    private authService: AuthService,
    private router: Router
  ) {}

  abrirFormulario(plan: string) {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario) {
      // Usuario no logueado → redirigir a registro/login
      alert('Debes registrarte o iniciar sesión para adquirir un plan');
      this.router.navigate(['/registrar']); // Ajusta a tu ruta real
      return;
    }

    // Usuario logueado → abrir modal
    this.planSeleccionado = plan;
    this.idPlan = this.obtenerIdPlan(plan);
    this.mostrarModal = true;
    this.enviado = false;

    this.montoPago = this.obtenerMontoPlan(plan);
    this.codigoOperacion = '';
    this.imagenComprobante = '';
    this.mostrarPago = false; // primero registramos la suscripción
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.codigoOperacion = '';
    this.imagenComprobante = '';
    this.mostrarPago = false;
  }

  obtenerIdPlan(plan: string): number {
    switch (plan) {
      case 'Básico': return 1;
      case 'Emprendedor': return 2;
      case 'Empresarial': return 3;
      default: return 0;
    }
  }

  obtenerMontoPlan(plan: string): number {
    switch (plan) {
      case 'Básico': return 29;
      case 'Emprendedor': return 59;
      case 'Empresarial': return 99;
      default: return 0;
    }
  }

  // 1️⃣ Registrar suscripción
  enviarFormulario() {
    const data = {
      idPlan: this.idPlan,
      nombreCliente: this.nombre,
      correo: this.correo,
      telefono: this.telefono
    };

    this.suscripcionService.suscribir(data).subscribe({
      next: (resp: any) => {
        this.enviado = true;
        this.suscripcionRegistradaId = resp.id; // guardar ID para pago
        this.mensajeRespuesta = 'Suscripción registrada correctamente';
        this.mostrarPago = true; // mostrar formulario de pago
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al registrar la suscripción');
      }
    });
  }

  // 2️⃣ Subir imagen comprobante
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.imagenComprobante = reader.result as string;
    reader.readAsDataURL(file);
  }

  // 3️⃣ Enviar pago Yape
  enviarPago() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      alert('Debes iniciar sesión para pagar');
      return;
    }

    const data = {
      idUsuario: usuario.id,
      idSuscripcion: this.suscripcionRegistradaId,
      monto: this.montoPago,
      codigoOperacion: this.codigoOperacion,
      imagenComprobante: this.imagenComprobante
    };

    this.pagoService.pagarConYape(data).subscribe({
      next: () => {
        alert('Pago enviado, pendiente de validación');
        this.cerrarModal();
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al enviar el pago');
      }
    });
  }
}
