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
    nombre: '',
    montoObjetivo: 0,
    acumulado: 0,
    porcentaje: 0,
    fechaLimite: '', // 'yyyy-MM-dd'
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
      next: metas => this.metas = metas,
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

    // Validar campos mínimos
    if (!this.nuevaMeta.nombre || !this.nuevaMeta.montoObjetivo || !this.nuevaMeta.fechaLimite) {
      this.mensaje = '⚠️ Complete todos los campos obligatorios';
      return;
    }

     // Convertir fecha vacía a null para LocalDate
    const metaEnviar={
      ...this.nuevaMeta,
      fechaLimite: this.nuevaMeta.fechaLimite || null
    };

    this.metasService.registrar(this.nuevaMeta).subscribe({
      next: metaCreada => {
        this.metas.push(metaCreada);

        // Resetear formulario
        this.nuevaMeta = {
          idUsuario: usuario.id!,
          nombre: '',
          montoObjetivo: 0,
          acumulado: 0,
          porcentaje: 0,
          fechaLimite: '',
          activa: true
        };

        this.mensaje = '✅ Meta registrada correctamente';
      },
      error: err => {
        console.error('Error al registrar meta:', err);
        this.mensaje = '❌ Error al registrar meta';
      }
    });
  }

desactivarMeta(id?: string) {
  if (!id) return; // evita errores si es undefined

  if (!confirm('¿Desactivar meta?')) return;

  this.metasService.desactivar(id).subscribe({
    next: () => {
      this.metas = this.metas.filter(m => m.id !== id);
      this.mensaje = '✅ Meta desactivada correctamente.';
    },
    error: err => {
      console.error('Error al desactivar meta:', err);
      this.mensaje = '❌ Error al desactivar meta';
    }
  });
}

}
