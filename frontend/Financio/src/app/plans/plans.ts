import { Component } from '@angular/core';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  plans = [
    { id: 1, name: 'Basico', price: 'Gratis', features: ['Control de gastos', 'Resumen mensual'] },
    { id: 2, name: 'Pro', price: 'S/29/mes', features: ['Exportar CSV', 'Reportes avanzados', 'Soporte básico'] },
    { id: 3, name: 'Premium', price: 'S/79/mes', features: ['Dashboard avanzado', 'Integraciones', 'Soporte prioritario'] }
  ];
}
