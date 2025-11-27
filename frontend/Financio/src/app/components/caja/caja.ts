import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CajaService } from '../../services/caja.service';
import { CajaModel } from '../../models/caja.model';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caja.html',
  styleUrl: './caja.css'
})
export class Caja {

  cajas: CajaModel[] = [];

  // Campos del formulario
  idUsuario!: number;
  nombre!: string;
  fondo!: number;

  idCajaCierre!: number;
  cierre!: number;

  idEliminar!: number;

  constructor(private cajaService: CajaService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.cajaService.listar().subscribe(resp => this.cajas = resp);
  }

  agregarFondo() {
    const nuevaCaja: CajaModel = {
      idUsuario: this.idUsuario,
      nombre: this.nombre,
      fondo: this.fondo
    };

    this.cajaService.agregarFondo(nuevaCaja).subscribe(() => {
      alert("Fondo registrado");
      this.listar();
    });
  }

  agregarCierre() {
    this.cajaService.agregarCierre(this.idCajaCierre, this.cierre).subscribe(() => {
      alert("Cierre registrado");
      this.listar();
    });
  }

  eliminar() {
    this.cajaService.eliminar(this.idEliminar).subscribe(() => {
      alert("Caja eliminada");
      this.listar();
    });
  }
}
