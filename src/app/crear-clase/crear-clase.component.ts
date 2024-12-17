import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.scss'],
})
export class CrearClaseComponent implements OnInit {
  clases: any[] = []; // Lista de clases

  clase = {
    id: '', // Cambia de null a una cadena vacía
    nombreClase: '',
    descripcion: '',
    profesorId: null // Mantén esto como null o puedes usar 0 si prefieres
  };
  

  private apiUrl = 'https://60349d2e-6643-4703-be2d-a4016e0aa87b-00-m1hesvg9ynjh.riker.replit.dev/clases'; // URL de la API

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarClases(); // Cargar todas las clases al iniciar
  }

  // Cargar todas las clases
  cargarClases() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      console.log('Clases cargadas:', data); // Agrega esto para depurar
      this.clases = data;
    });
  }
  

  guardarClase() {
    const { id, ...claseSinId } = this.clase; // Elimina el id del objeto
  
    if (id) {
      // Si tiene id, actualizar clase existente
      this.http.put(`${this.apiUrl}/${id}`, claseSinId).subscribe(() => {
        this.resetForm();
        this.cargarClases();
      });
    } else {
      // Si no tiene id, crear una nueva clase
      this.http.post(this.apiUrl, claseSinId).subscribe(() => {
        this.resetForm();
        this.cargarClases();
      });
    }
  }
  

  // Editar clase (rellenar formulario con los datos de la clase seleccionada)
  editarClase(clase: { id: ''; nombreClase: string; descripcion: string; profesorId: null; }) {
    this.clase = { ...clase };
  }
  eliminarClase(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.cargarClases(); // Recarga la lista de clases después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar la clase:', error);
      }
    });
  }
  

  // Resetear el formulario después de crear/editar
  resetForm() {
    this.clase = {
      id: '',
      nombreClase: '',
      descripcion: '',
      profesorId: null
    };
  }
}
