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

  // Modal Suscripción
  mostrarModal = false;
  planSeleccionado = '';
  idPlan = 0;
  nombre = '';
  correo = '';
  telefono = '';

  // Pago Yape
  mostrarPago = false;
  pagoIniciado = false;
  montoPago = 0;
  idSuscripcion = 0;
  codigoOperacion = '';
  imagenComprobante: string = '';

  // UI
  enviado = false;
  mensajeRespuesta = '';

  qrYape: string = '/qr2.png'; // Base64 o URL del QR generado por el backend


  constructor(
    private suscripcionService: SuscripcionService,
    private pagoService: PagoService,
    private authService: AuthService,
    private router: Router
  ) { }

  abrirFormulario(plan: string) {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      alert('Debes registrarte o iniciar sesión para adquirir un plan');
      this.router.navigate(['/registrar']);
      return;
    }

    this.planSeleccionado = plan;
    this.idPlan = this.obtenerIdPlan(plan);
    this.montoPago = this.obtenerMontoPlan(plan);
    this.mostrarModal = true;
    this.enviado = false;
    this.mostrarPago = false;
    this.pagoIniciado = false;

    this.nombre = usuario.nombre;
    this.correo = usuario.correo;
    this.telefono = usuario.telefono || '';
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.mostrarPago = false;
    this.pagoIniciado = false;
    this.codigoOperacion = '';
    this.imagenComprobante = '';
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
  const usuario = this.authService.obtenerUsuario();

    if (!usuario || !usuario.id) {
    alert("Usuario no válido");
    return;
  }
  const data = {
    idUsuario: usuario.id,
    idPlan: this.idPlan
  };

  this.pagoService.iniciarPagoYape(data).subscribe({
    next: (resp: any) => {
      console.log("Pago iniciado:", resp);

      this.idSuscripcion = resp.idSuscripcion;
      this.montoPago = resp.monto;

      this.mostrarPago = true;
      this.pagoIniciado = true;

      this.qrYape = "/qr2.png";
    },
    error: (err: any) => {
      console.error(err);
      alert('Error al iniciar el pago con Yape');
    }
  });
} 
/* enviarFormulario() {
  const usuario = this.authService.obtenerUsuario();

  if (!usuario || !usuario.id) {
    alert("Usuario no válido");
    return;
  }

  const data = {
    idUsuario: usuario.id,
    idPlan: this.idPlan
  };

  this.pagoService.iniciarPagoYape(data).subscribe({
    next: (resp: any) => {
      console.log("Suscripción creada:", resp);

      // ⚡ Para pruebas: activar suscripción inmediatamente
      alert("¡Suscripción activada! Ya puedes acceder a todos los módulos.");

      // Cerrar modal
      this.cerrarModal();

      // Redirigir al módulo principal
      this.router.navigate(['/dashboard']);   // <- CAMBIA A TU RUTA REAL
    },
    error: (err: any) => {
      console.error(err);
      alert('Error al registrar suscripción');
    }
  });
} */



  // 2️⃣ Iniciar pago con Yape
  iniciarPagoYape() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario || !usuario.id) {
      alert('Usuario no válido');
      return;
    }

    const data = {
      idUsuario: usuario.id,
      idPlan: this.idPlan
    };

    this.pagoService.iniciarPagoYape(data).subscribe({
      next: (resp: any) => {
        alert(`Pago iniciado. Monto: S/${resp.monto}`);
        this.pagoIniciado = true; // muestra el formulario de confirmación
        this.qrYape = "/qr2.png" // aquí va tu imagen del QR
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al iniciar el pago con Yape');
      }
    });

  }

  // 3️⃣ Confirmar pago Yape
enviarPagoYape() {
  const usuario = this.authService.obtenerUsuario();

    console.log("Usuario actual:", usuario);
  console.log("idSuscripcion:", this.idSuscripcion);
  console.log("Monto:", this.montoPago);
  console.log("Código operación:", this.codigoOperacion);

  if (!usuario || !usuario.id) {
    alert('Usuario no válido');
    return;
  }

  if (!this.idSuscripcion || this.idSuscripcion === 0) {
    alert('Debes registrar primero la suscripción antes de pagar.');
    return;
  }

  if (!this.codigoOperacion || this.codigoOperacion.trim() === "") {
    alert('Debes ingresar el código de operación de Yape.');
    return;
  }

  if (!this.montoPago || this.montoPago <= 0) {
    alert('Monto inválido.');
    return;
  }

  const data = {
    idUsuario: usuario.id,
    idSuscripcion: this.idSuscripcion,
    monto: this.montoPago,
    codigoOperacion: this.codigoOperacion,
    imagenComprobante: this.imagenComprobante
  };

  console.log("Datos enviados al backend:", data);

  this.pagoService.confirmarPagoYape(data).subscribe({
     next: (resp: any) => {
      alert('Pago enviado correctamente y suscripción activada.');

      // 🔥 ACTUALIZAR EL USUARIO EN LOCALSTORAGE
  const usuario = this.authService.obtenerUsuario();
  if (usuario) {
    usuario.suscripcionActiva = true;
    this.authService.guardarUsuario(usuario);
    console.log("Usuario actualizado:", usuario);
  }


      this.cerrarModal();
    },
    error: (err: any) => {
      console.error(err);
      if (err.error?.error) {
        alert(err.error.error);
      } else {
        alert('Error al enviar el pago');
      }
    }
  });
}

   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenComprobante = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
