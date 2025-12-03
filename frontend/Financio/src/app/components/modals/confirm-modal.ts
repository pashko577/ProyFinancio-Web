import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrls: ['./confirm-modal.css']  
})
export class ConfirmModal {
  @Input() mostrar = false;            
  @Input() titulo = 'Confirmar acción';
  @Input() mensaje = '¿Deseas continuar?'; 
  @Input() textoCancelar = 'Cancelar'; 
  @Input() textoConfirmar = 'Confirmar'; 

  @Output() cancelar = new EventEmitter<void>(); 
  @Output() confirmar = new EventEmitter<void>(); 

  onCancelar() {
    this.cancelar.emit();
  }

  onConfirmar() {
    this.confirmar.emit();
  }
}

