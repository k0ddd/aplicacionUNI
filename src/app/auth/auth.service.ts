import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false; // Estado de autenticación
  private apiUrl = 'http://localhost:3000/users'; // URL de tu API REST
  private userIdKey = 'userId'; // Clave para el ID del usuario

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn; // Verifica el estado de autenticación
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.loggedIn = true; // Cambia el estado de autenticación
          localStorage.setItem(this.userIdKey, user.id.toString()); // Guarda el ID del usuario en el localStorage
          return user; // Devuelve el usuario autenticado
        } else {
          return null; // Usuario no encontrado
        }
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        return of(null); // Manejo básico de errores
      })
    );
  }

  logout() {
    this.loggedIn = false; // Cambia el estado de autenticación
    localStorage.removeItem(this.userIdKey); // Elimina el ID del usuario
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null; // Devuelve el ID del usuario almacenado
  }
}
