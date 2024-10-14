// src/app/services/clases.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historial } from '../models/historial.model'; // Asegúrate de que este modelo esté definido
import { Clase } from '../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private apiUrl = 'http://localhost:3000/clases'; // URL de tu API
  private historialUrl = 'http://localhost:3000/historial'; // URL del historial

  constructor(private http: HttpClient) {}

  // Obtener todas las clases
  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

  // Registrar una clase en el historial
  addToHistorial(historial: Historial): Observable<Historial> {
    return this.http.post<Historial>(this.historialUrl, historial, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
