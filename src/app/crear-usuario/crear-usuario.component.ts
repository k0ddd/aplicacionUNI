import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {
  cuentas: any[] = []; // Lista de usuarios
  cuenta = {
    id: null,
    name: '',
    email: '',
    password: '',
    rut: '',
    ocupacion: 'Alumno'
  }; // Modelo para crear/editar usuarios

  private apiUrl = 'http://localhost:3000/users'; // URL de la API para usuarios

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarCuentas(); // Cargar todos los usuarios al iniciar
  }

  // Cargar todos los usuarios
  cargarCuentas() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.cuentas = data;
    });
  }

  guardarCuenta() {
    if (!this.cuenta.name || !this.cuenta.email || !this.cuenta.password || !this.cuenta.rut) {
      console.error('Faltan datos para crear la cuenta');
      return; // Sal de la función si falta algún dato
    }
  
    const { id, ...cuentaSinId } = this.cuenta; // Eliminar el id del objeto
  
    if (id) {
      // Si tiene id, actualizar cuenta existente
      this.http.put(`${this.apiUrl}/${id}`, cuentaSinId).subscribe(
        () => {
          this.resetForm();
          this.cargarCuentas();
        },
        error => {
          console.error('Error al actualizar la cuenta:', error);
        }
      );
    } else {
      // Si no tiene id, crear una nueva cuenta
      this.http.post(this.apiUrl, cuentaSinId).subscribe(
        response => {
          console.log('Cuenta creada:', response); // Verifica la respuesta
          this.resetForm();
          this.cargarCuentas();
        },
        error => {
          console.error('Error al crear la cuenta:', error);
        }
      );
    }
  }
  

  // Editar cuenta (rellenar formulario con los datos de la cuenta seleccionada)
  editarCuenta(cuenta: { id: null; name: string; email: string; password: string; rut: string; ocupacion: string; }) {
    this.cuenta = { ...cuenta };
  }

  // Eliminar cuenta
  eliminarCuenta(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.cargarCuentas(); // Recargar la lista de cuentas después de eliminar
    });
  }

  // Resetear el formulario después de crear/editar
  resetForm() {
    this.cuenta = {
      id: null,
      name: '',
      email: '',
      password: '',
      rut: '',
      ocupacion: 'Alumno'
    };
  }
}
