import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
email = '';
  password = '';

  login() {
    if (this.email && this.password) {
      console.log('Inicio de sesión:', this.email);
    } else {
      alert('Por favor completa los campos.');
    }
  }
}
