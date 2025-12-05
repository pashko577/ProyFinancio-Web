import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorUsuarios } from '../gestor-usuarios/gestor-usuarios';
import { GestorPagos } from '../gestor-pagos/gestor-pagos';


@Component({
  selector: 'app-superadmin-panel',
  standalone: true,
  imports: [CommonModule, GestorUsuarios, GestorPagos],
  templateUrl: './superadmin-panel.html',
  styleUrls: ['./superadmin-panel.css']
})
export class SuperAdminPanel {
  moduloActivo: 'usuarios' | 'pagos' = 'usuarios';

  mostrarModulo(modulo: 'usuarios' | 'pagos') {
    this.moduloActivo = modulo;
  }
}
