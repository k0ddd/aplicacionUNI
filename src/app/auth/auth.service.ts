import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authTokenKey="authToken";
  private userRoleKey = "userRole"; 
  private loggedIn: boolean = false; 
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  storeToken(token:string):void{
    localStorage.setItem(this.authTokenKey, token);
  }

  storeUserId(id: number): void {
    localStorage.setItem('userId', id.toString());
  }
  
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null; // Convierte a número, si existe
  }
  
  storeUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role); 
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey); // Devuelve el rol del usuario
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.storeToken(user.token);
          this.storeUserRole(user.ocupacion);
          this.loggedIn = true; // Cambia el estado de autenticación
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

  removeToken():void{
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
  }
}
