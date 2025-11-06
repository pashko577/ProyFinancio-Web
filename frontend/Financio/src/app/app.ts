import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from './services/AuthService';
import { Footer } from './Shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Financio');
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
