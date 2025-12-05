import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MetasService, Meta } from '../../services/metas.service';
import { AuthService } from '../../services/AuthService';
import { AportesService, Aporte } from '../../services/aportes.service';
import { RecordatoriosService, Recordatorio } from '../../services/recordatorio.service';

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
  recordatorios: (Recordatorio & { fechaMeta?: string })[] = [];

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
    private authService: AuthService,
    private aportesService: AportesService,
    private recordatoriosService: RecordatoriosService
  ) {}

  ngOnInit() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) return;
    this.nuevaMeta.idUsuario = usuario.id;

    this.cargarMetas();
  }

  // Cargar todas las metas del usuario
  cargarMetas() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) return;

    this.metasService.listarPorUsuario(usuario.id).subscribe({
      next: metas => {
        this.metas = metas;
        // 🔹 Después de tener las metas, cargar recordatorios
        this.cargarRecordatorios();
      },
      error: err => console.error('Error al cargar metas:', err)
    });
  }

  // Cargar todos los recordatorios del usuario y mapear con las metas
  cargarRecordatorios() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) return;

    this.recordatoriosService.listarPorUsuario(usuario.id).subscribe({
      next: data => {
        this.recordatorios = data.map(r => {
          const meta = this.metas.find(m => m.id === r.idMeta);
          if (!meta || !meta.fechaLimite) return r;

          const hoy = new Date();
          const fechaLimite = new Date(meta.fechaLimite);

          hoy.setHours(0,0,0,0);
          fechaLimite.setHours(0,0,0,0);

          const diasFaltantes = Math.max(
            Math.floor((fechaLimite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)) + 1,
            0
          );

          return {
            ...r,
            mensaje: `⏰ Recuerda tu meta: ${meta.nombreMeta}. Faltan ${diasFaltantes} días.`,
            fechaMeta: meta.fechaLimite
          };
        });
      },
      error: err => console.error('Error al cargar recordatorios:', err)
    });
  }

  // Registrar nueva meta y recargar recordatorios
  registrarMeta() {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario?.id) {
      this.mensaje = '⚠️ Usuario no autenticado';
      return;
    }

    if (!this.nuevaMeta.nombreMeta || !this.nuevaMeta.montoObjetivo || !this.nuevaMeta.fechaLimite) {
      this.mensaje = '⚠️ Complete todos los campos obligatorios';
      return;
    }

    this.nuevaMeta.idUsuario = usuario.id;

    this.metasService.registrar(this.nuevaMeta).subscribe({
      next: (metaGuardada: Meta) => {
        this.mensaje = '✅ Meta registrada correctamente';
        this.metas.push(metaGuardada);

        // 🔹 Pequeño delay para que PostgreSQL cree el recordatorio
        setTimeout(() => this.cargarRecordatorios(), 300);

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
    if (!id || !confirm('¿Desactivar meta?')) return;

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

  agregarAhorro(meta: Meta) {
    const montoStr = prompt(`Ingrese monto a agregar a "${meta.nombreMeta}":`);
    if (!montoStr) return;

    const monto = parseFloat(montoStr);
    if (isNaN(monto) || monto <= 0) {
      alert('Monto inválido');
      return;
    }

    const aporte: Aporte = {
      idMeta: meta.id!,
      monto: monto
    };

    this.aportesService.registrarAporte(aporte).subscribe({
      next: () => {
        this.mensaje = '✅ Ahorro agregado correctamente';
        this.cargarMetas();
      },
      error: err => {
        console.error('Error al agregar ahorro:', err);
        this.mensaje = '❌ Error al agregar ahorro';
      }
    });
  }
}


