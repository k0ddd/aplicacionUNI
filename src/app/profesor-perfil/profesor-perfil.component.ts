import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';// Ajusta la ruta del servicio según corresponda

@Component({
  selector: 'app-profesor-perfil',
  templateUrl: './profesor-perfil.component.html',
  styleUrls: ['./profesor-perfil.component.scss'],
})
export class ProfesorPerfilComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getUser(); // Obtén el usuario desde AuthService
    if (user) {
      this.userName = user.name; // Guarda el nombre del usuario
      this.userEmail = user.email; // Guarda el email del usuario
    }
  }
}