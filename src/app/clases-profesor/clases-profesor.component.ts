import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { AuthService } from '../auth/auth.service';
import { Clase } from '../models/clase.model';
import { Historial } from '../models/historial.model';

@Component({
  selector: 'app-clases-profesor',
  templateUrl: './clases-profesor.component.html',
  styleUrls: ['./clases-profesor.component.scss'],
})
export class ClasesProfesorComponent implements OnInit {
  clases: Clase[] = []; // Almacena las clases del profesor
  nuevoHistorial: Historial = {
    id: 0,
    claseId: 0,
    fecha: '',
    horaInicio: '',
    horaFin: '',
  };

  constructor(
    private clasesService: ClasesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarClases();
  }

  cargarClases() {
    this.clasesService.getClases().subscribe(
      (data: Clase[]) => {
        const profesorId = this.authService.getUserId(); // Obtener el ID del profesor autenticado
        if (profesorId !== null) {
          this.clases = data.filter(clase => clase.profesorId === profesorId); // Filtrar clases por el ID del profesor
        }
      },
      (error: any) => console.error(error)
    );
  }

  registrarClase() {
    console.log('Datos a registrar:', this.nuevoHistorial); // Para depurar

    // Validar que todos los campos requeridos estén llenos
    if (this.nuevoHistorial.claseId && this.nuevoHistorial.fecha) {
      this.clasesService.addToHistorial(this.nuevoHistorial).subscribe(
        (data: Historial) => {
          console.log('Clase registrada:', data);
          this.resetNuevoHistorial(); // Reiniciar el formulario
        },
        (error: any) => console.error(error)
      );
    } else {
      console.error('Por favor, complete todos los campos.'); // Mensaje de error si falta información
    }
  }

  private resetNuevoHistorial() {
    this.nuevoHistorial = {
      id: 0,
      claseId: 0,
      fecha: '',
      horaInicio: '',
      horaFin: '',
    };
  }
}
