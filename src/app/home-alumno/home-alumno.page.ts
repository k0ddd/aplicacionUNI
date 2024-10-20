import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage  {

  usuarioNombre: string = ''; // Para almacenar el nombre del usuario
  
  constructor(private router: Router, private authService: AuthService) {
    const user = this.authService.getUser(); // Obtiene el usuario desde el servicio
    if (user) {
      this.usuarioNombre = user.name; // Asigna el nombre del usuario
    }
    this.router.navigate(['home-alumno/historial-asistencia']);
  }
  
    segmentChanged($event: any){
      console.log($event.detail.value);
      let direction=$event.detail.value
      this.router.navigate(['home-alumno/'+direction])
    }
  }
  