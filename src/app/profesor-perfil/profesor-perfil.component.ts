import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profesor-perfil',
  templateUrl: './profesor-perfil.component.html',
  styleUrls: ['./profesor-perfil.component.scss'],
})
export class ProfesorPerfilComponent implements OnInit {
  user: any; // Para almacenar la información del usuario

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = '3'; // Cambia esto por el ID que necesites
    this.getUserById(userId);
  }

  getUserById(id: string) {
    this.http.get(`http://localhost:3000/users/${id}`).subscribe(data => {
      this.user = data; // Asigna la respuesta del API al usuario
    }, error => {
      console.error('Error al obtener los datos del usuario', error);
    });
  }
}
