import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CajaService } from '../../services/caja.service';
import { CajaModel } from '../../models/caja.model';
import { AuthService } from '../../services/AuthService';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caja.html',
  styleUrls: ['./caja.css']
})
export class Caja {

  cajas: CajaModel[] = [];

  // Campos del formulario
  nombre: string = '';
  fondo!: number;

  // Cierre
  idCajaCierre!: number;
  cierre!: number;
  fechaCierre!: string;

  // ID de la caja creada
  idCajaCreada!: number;

  // Usuario logueado
  usuarioLogueado: Usuario | null = null;

  constructor(
    private cajaService: CajaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Obtenemos usuario logueado desde la señal
    this.usuarioLogueado = this.authService.usuario();
    if (this.usuarioLogueado) {
      this.nombre = this.usuarioLogueado.nombre;
    }

    this.listar();
  }

  listar() {
    this.cajaService.listar().subscribe(resp => this.cajas = resp);
  }

  // =========================
  // REGISTRAR FONDO
  // =========================
  agregarFondo() {
    if (!this.usuarioLogueado || !this.fondo) {
      alert('No se pudo registrar el fondo. Verifica los datos.');
      return;
    }

    const payload = {
      usuario: { id: this.usuarioLogueado.id },
      nombre: this.nombre,
      fondo: Number(this.fondo)
    };

    this.cajaService.agregarFondo(payload).subscribe({
      next: (resp: any) => {
        this.idCajaCreada = resp.idCaja; // guardamos ID generado automáticamente
        alert('Fondo registrado correctamente');
        this.listar();
        this.fondo = 0; // reset del campo
      },
      error: (err) => {
        console.error('ERROR BACKEND:', err);
        alert('Error al registrar fondo');
      }
    });
  }

  // =========================
  // REGISTRAR CIERRE
  // =========================
  agregarCierre() {
    if (!this.idCajaCreada || !this.cierre || !this.fechaCierre) {
      alert('Complete todos los campos para cerrar la caja.');
      return;
    }

    const payload = {
      cierre: Number(this.cierre),
      fechaCierre: this.fechaCierre
    };

    // Usamos siempre la caja creada
    this.cajaService.agregarCierre(this.idCajaCreada, payload).subscribe({
      next: () => {
        alert('Cierre registrado correctamente');
        this.listar();
        this.cierre = 0;
        this.fechaCierre = '';
      },
      error: () => alert('Error al registrar cierre')
    });
  }

}
