import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false; // Estado de autenticación
  private apiUrl = 'http://localhost:3000/users'; // URL de tu API REST

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.loggedIn = true; // Cambia el estado de autenticación
          return user; // Devuelve el usuario autenticado
        } else {
          return null; // Usuario no encontrado
        }
      })
    );
  }

  logout() {
    this.loggedIn = false; // Cambia el estado de autenticación
  }
}
