import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from '../models/clase.model';
import { Historial } from '../models/historial.model';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private apiUrl = 'http://localhost:3000/clases'; // URL de tu API

  constructor(private http: HttpClient) {}

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

  addToHistorial(historial: Historial): Observable<Historial> {
    const historialUrl = 'http://localhost:3000/historial'; // URL del historial
    return this.http.post<Historial>(historialUrl, historial);
  }
}
