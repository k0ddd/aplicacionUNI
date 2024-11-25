import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.scss'],
})
export class CodigoqrComponent implements OnInit {
  profesorId: number | null = null;
  qrData: string = ''; // Datos del código QR, inicialmente vacíos
  cards: any[] = []; // Datos de las clases
  private apiUrlClases = 'http://localhost:3000/clases'; // URL para obtener las clases

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del profesor autenticado
    this.profesorId = this.authService.getUserId();
    this.cargarClases();
  }

  cargarClases() {
    // Hacer una solicitud para obtener las clases del profesor
    this.http.get<any[]>(`${this.apiUrlClases}?profesorId=${this.profesorId}`).subscribe({
      next: (clases) => {
        // Mapear las clases a la estructura del componente `cards`
        this.cards = clases.map((clase, index) => ({
          id: `card-${index}`, // Genera un id único para cada card
          idClase: clase.idClase,
          titulo: clase.nombreClase,
          fecha: '', // Campos fecha y hora vacíos
          hora: '',
        }));
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
      }
    });
  }

  generarCodigoQR(card: any) {
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();

    // Actualizar los datos que se mostrarán en el QR
    this.qrData = JSON.stringify({
      idClase: card.idClase,
      titulo: card.titulo,
      fecha: fecha,
      hora: hora,
    });

    // Crear el historial para la clase (si es necesario guardarlo en la base de datos)
    const registroHistorial = {
      idClase: card.idClase,
      fecha: fecha,
      titulo: card.titulo,
      hora: hora,
      profesorId: this.profesorId,
    };

    // Guardar el historial en la base de datos (opcional)
    const apiUrlHistorial = 'http://localhost:3000/historial';
    this.http.post(apiUrlHistorial, registroHistorial).subscribe({
      next: (response) => {
        console.log('Historial de clase registrado:', response);
      },
      error: (error) => {
        console.error('Error al registrar el historial de la clase:', error);
      }
    });
  }
}

