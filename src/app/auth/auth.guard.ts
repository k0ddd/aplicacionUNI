import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de crear el servicio AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'admin') {
        return true; // Permite el acceso a todas las rutas para administradores
      }
      // Aquí puedes agregar lógica para otros roles, si es necesario
      return true; // Permite el acceso a otros usuarios (ajusta esto según sea necesario)
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
  }
}