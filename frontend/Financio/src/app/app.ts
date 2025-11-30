import { Component, effect } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/AuthService';
import { Footer } from './Shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  nombreUsuario = '';
  rol = '';
  

  constructor(public authService: AuthService, private router: Router) {
    // Efecto reactivo: cuando cambia el usuario en AuthService, actualiza navbar
    effect(() => {
      const usuario = this.authService.usuario();
      this.nombreUsuario = usuario?.nombre || '';
      this.rol = usuario?.rol || '';
    });
  }

  logout() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
