import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const usuario = this.authService.usuario(); // tu signal o método para obtener el usuario

    if (usuario && usuario.id) {
      // Clonar request y agregar el header X-USER-ID
      const authReq = req.clone({
        setHeaders: {
          'X-USER-ID': usuario.id.toString()
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
