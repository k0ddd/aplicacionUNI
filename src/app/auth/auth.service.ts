import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  private authTokenKey = "authToken";
  private userRoleKey = "userRole"; 
  private userIdKey = "userId"; // Nueva clave para almacenar userId
  private loggedIn: boolean = false; 
  private apiUrl = 'https://60349d2e-6643-4703-be2d-a4016e0aa87b-00-m1hesvg9ynjh.riker.replit.dev/'; 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<any> {
    const url = `${this.apiUrl}users?username=${username}`;
    return this.http.get(url, { headers: this.httpOptions.headers }).pipe(
      map((response: any) => response), // Procesa la respuesta si es válida
      catchError((error) => {
        console.error('Error fetching user:', error);
        return of(null); // Devuelve null si ocurre un error
      })
    );
  }
  
  
  
  storeToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  setUser(user: any) {
    this.user = user; // Guarda el objeto del usuario completo
  }
  
  getUser() {
    return this.user; // Devuelve el usuario completo
  }
  
  storeUserId(id: number): void {
    localStorage.setItem(this.userIdKey, id.toString()); // Almacena userId
  }
  
  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? Number(userId) : null; // Convierte a número, si existe
  }
  
  storeUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role); 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey); // Devuelve el rol del usuario
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}users?email=${email}`; // Endpoint para buscar por email
    return this.http.get<any[]>(url, { headers: this.httpOptions.headers }).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Correo electrónico no encontrado');
        }
        const user = users.find(u => u.password === password);
        if (!user) {
          throw new Error('Contraseña incorrecta');
        }
        this.storeToken('dummy-token'); // Cambiar por un token real si existe
        this.storeUserRole(user.ocupacion);
        this.setUser(user); // Almacena el usuario completo
        this.storeUserId(user.id); // Almacena el userId
        this.loggedIn = true; // Cambia el estado de autenticación
        return user; // Devuelve el usuario autenticado
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        return of(null); // Manejo básico de errores
      })
    );
  }
  

  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.userIdKey); // Elimina también el userId
  }
}
