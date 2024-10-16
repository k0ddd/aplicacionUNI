import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-clases',
  templateUrl: './historial-clases.component.html',
  styleUrls: ['./historial-clases.component.scss'],
})
export class HistorialClasesComponent implements OnInit {
  profesorId: number | null = null;
  cards: { id: string; idClase: number; titulo: string; fecha: string; hora: string}[] = [];
  private apiUrlClases = 'http://localhost:3000/clases';
  private apiUrlHistorial = 'http://localhost:3000/historial';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del profesor autenticado directamente
    this.profesorId = this.authService.getUserId(); // Asegúrate de que getUserId() devuelva el ID como string
    this.cargarClases();
  }

  cargarClases() {
    // Hacer una solicitud para obtener las clases del profesor
    this.http.get<any[]>(`${this.apiUrlClases}?profesorId=${this.profesorId}`).subscribe({
      next: (clases) => {
        // Mapear las clases a la estructura del componente `cards`
        this.cards = clases.map((clase, index) => ({
          id: `card-${index}`,  // Genera un id único para cada card
          idClase: clase.idClase,
          titulo: clase.nombreClase,
          fecha: '',  // Campos fecha y hora vacíos hasta que el profesor registre el historial
          hora: ''
        }));
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
      }
    });
  }

  generarHistorialClase(card: any) {
    const now = new Date();
    card.fecha = now.toLocaleDateString(); 
    card.hora = now.toLocaleTimeString();
    
    const registroHistorial = {
      idClase: card.idClase,
      fecha: card.fecha,
      titulo: card.titulo,
      hora: card.hora,
      profesorId: this.profesorId
    };

    // Guardar el historial en la base de datos
    this.http.post(this.apiUrlHistorial, registroHistorial).subscribe({
      next: (response) => {
        console.log('Historial de clase registrado:', response);
      },
      error: (error) => {
        console.error('Error al registrar el historial de la clase:', error);
      }
    });
  }
}
