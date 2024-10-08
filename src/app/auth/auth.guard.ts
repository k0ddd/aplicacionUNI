import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de crear el servicio AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
        const expectedRole = route.data['role'];
        const userRole = this.authService.getUserRole();

        if (expectedRole === userRole) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
