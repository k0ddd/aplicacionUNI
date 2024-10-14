// src/app/clases-profesor/clases-profesor.component.ts
import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { Clase } from '../models/clase.model';
import { Historial } from '../models/historial.model';

@Component({
  selector: 'app-clases-profesor',
  templateUrl: './clases-profesor.component.html',
  styleUrls: ['./clases-profesor.component.scss'],
})
export class ClasesProfesorComponent implements OnInit {
  clases: Clase[] = [];
  nuevoHistorial: Historial = {
    id: 0,
    claseId: 0,
    fecha: '',
    horaInicio: '',
    horaFin: '',
  };

  constructor(private clasesService: ClasesService) {}

  ngOnInit() {
    this.cargarClases();
  }

  cargarClases() {
    this.clasesService.getClases().subscribe(
      (data: Clase[]) => {
        this.clases = data; // Cargar clases existentes
      },
      (error: any) => console.error(error)
    );
  }

  registrarClase() {
    this.clasesService.addToHistorial(this.nuevoHistorial).subscribe(
      (data: Historial) => {
        console.log('Clase registrada:', data);
        this.resetNuevoHistorial();
      },
      (error: any) => console.error(error)
    );
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
