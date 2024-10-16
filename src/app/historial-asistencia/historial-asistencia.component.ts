import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-asistencia',
  templateUrl: './historial-asistencia.component.html',
  styleUrls: ['./historial-asistencia.component.scss'],
})
export class HistorialAsistenciaComponent implements OnInit {
  usuarioId: number | null = null;
  historial: any[] = [];
  private apiUrlHistorial = 'http://localhost:3000/historial';
  private apiUrlHistorialAlumno = 'http://localhost:3000/historialAlumno';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.usuarioId = this.authService.getUserId(); // Obtener el ID del alumno desde el AuthService
    this.cargarHistorial(); // Cargar el historial creado por el profesor
  }

  cargarHistorial() {
    // Obtener el historial de clases desde el backend
    this.http.get<any[]>(this.apiUrlHistorial).subscribe({
      next: (data) => {
        this.historial = data; // Asignar el historial de clases al array `historial`
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);
      }
    });
  }

  registrarAsistencia(historialItem: any) {
    if (this.usuarioId) {
      const registroAsistencia = {
        idClase: historialItem.idClase,
        titulo: historialItem.nombreClase,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        alumnoId: this.usuarioId
      };

      // Enviar la asistencia al backend
      this.http.post(this.apiUrlHistorialAlumno, registroAsistencia).subscribe({
        next: (response) => {
          console.log('Asistencia registrada:', response);
        },
        error: (error) => {
          console.error('Error al registrar asistencia:', error);
        }
      });
    }
  }
}
