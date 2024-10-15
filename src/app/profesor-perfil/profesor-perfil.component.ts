import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profesor-perfil',
  templateUrl: './profesor-perfil.component.html',
  styleUrls: ['./profesor-perfil.component.scss'],
})
export class ProfesorPerfilComponent implements OnInit {
  direccion: string = 'calle siempre viva';
  email: string = '';
  emailper: string = '';

  constructor(private route: ActivatedRoute) {}

  async loadData(usuarioId: number) {
    try {
      const response = await fetch('assets/db.json'); // Ruta a tu archivo JSON
      const data = await response.json();
      
      // Buscar el usuario en el array
      const user = data.users.find((user: { id: number }) => user.id === usuarioId);

      if (user) {
        this.direccion = user.direccion;
        this.email = user.email;
        this.emailper = user.emailper;
      } else {
        console.error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  ngOnInit() {
    // Obtener el ID del usuario desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.loadData(Number(userId)); // Convertir a número
      }
    });
  }
}