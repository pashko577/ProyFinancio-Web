import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MetasService, Meta } from '../../services/metas.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './metas.html',
  styleUrls: ['./metas.css']
})
export class Metas implements OnInit {

  metas: Meta[] = [];
  mensaje: string = '';

  nuevaMeta: Meta = {
    idUsuario: 0,
    nombreMeta: '',
    montoObjetivo: 0,
    acumulado: 0,
    porcentaje: 0,
    fechaLimite: '',
    activa: true
  };

  constructor(
    private metasService: MetasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) return;

    this.nuevaMeta.idUsuario = usuario.id;
    this.cargarMetas();
  }

  cargarMetas() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) return;

    this.metasService.listarPorUsuario(usuario.id).subscribe({
      next: metas => (this.metas = metas),
      error: err => console.error('Error al cargar metas:', err)
    });
  }

  registrarMeta() {
    const usuario = this.authService.obtenerUsuario();

    if (!usuario?.id) {
      this.mensaje = '⚠️ Usuario no autenticado';
      return;
    }

    this.nuevaMeta.idUsuario = usuario.id;

    // Validación mínima
    if (!this.nuevaMeta.nombreMeta || !this.nuevaMeta.montoObjetivo || !this.nuevaMeta.fechaLimite) {
      this.mensaje = '⚠️ Complete todos los campos obligatorios';
      return;
    }

    // Prepara la meta para enviar a Spring Boot
    const metaEnviar: Meta = {
      ...this.nuevaMeta,
      fechaLimite: this.nuevaMeta.fechaLimite || null
    };

    this.metasService.registrar(metaEnviar).subscribe({
      next: () => {
        this.mensaje = '✅ Meta registrada correctamente';
        this.cargarMetas(); // Recarga desde backend

        // Limpiar formulario
        this.nuevaMeta = {
          idUsuario: usuario.id!,
          nombreMeta: '',
          montoObjetivo: 0,
          acumulado: 0,
          porcentaje: 0,
          fechaLimite: '',
          activa: true
        };
      },
      error: err => {
        console.error('Error al registrar meta:', err);
        this.mensaje = '❌ Error al registrar meta';
      }
    });
  }

  desactivarMeta(id?: string) {
    if (!id) return;

    if (!confirm('¿Desactivar meta?')) return;

    this.metasService.desactivar(id).subscribe({
      next: () => {
        this.mensaje = '✅ Meta desactivada correctamente';
        this.cargarMetas();
      },
      error: err => {
        console.error('Error al desactivar meta:', err);
        this.mensaje = '❌ Error al desactivar meta';
      }
    });
  }

  //metodo para agregar ahorro
  agregarAhorro(meta: Meta) {
  const montoStr = prompt(`Ingrese monto a agregar a "${meta.nombreMeta}":`);
  if (!montoStr) return;

  const monto = parseFloat(montoStr);
  if (isNaN(monto) || monto <= 0) {
    alert('Monto inválido');
    return;
  }

  this.metasService.agregarAhorro(meta.id!, monto).subscribe({
    next: () => {
      this.mensaje = '✅ Ahorro agregado correctamente';
      this.cargarMetas(); // recarga la lista con el nuevo acumulado
    },
    error: err => {
      console.error('Error al agregar ahorro:', err);
      this.mensaje = '❌ Error al agregar ahorro';
    }
  });
}

}
