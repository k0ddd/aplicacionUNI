import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Ajusta la ruta del servicio

@Component({
  selector: 'app-alumno-perfil',
  templateUrl: './alumno-perfil.component.html',
  styleUrls: ['./alumno-perfil.component.scss'],
})
export class AlumnoPerfilComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getUser(); // Obtén el usuario desde AuthService
    if (user && user.ocupacion === 'Alumno') { // Verifica que sea un alumno
      this.userName = user.name; // Guarda el nombre del alumno
      this.userEmail = user.email; // Guarda el email del alumno
    }
  }
}