import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alumno-asistencia',
  templateUrl: './alumno-asistencia.component.html',
  styleUrls: ['./alumno-asistencia.component.scss'],
})
export class AlumnoAsistenciaComponent implements OnInit {
  usuarioId: number | null = null;
  historial: any[] = [];
  private apiUrlHistorial = 'http://localhost:3000/historial';
  private apiUrlHistorialAlumno = 'http://localhost:3000/historialAlumno';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.usuarioId = this.authService.getUserId(); // Obtener el ID del alumno
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.http.get<any[]>(this.apiUrlHistorial).subscribe({
      next: (data) => {
        this.historial = data; // Asignar el historial de clases para mostrar
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
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        alumnoId: this.usuarioId
      };

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

