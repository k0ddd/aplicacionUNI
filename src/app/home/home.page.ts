import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarioNombre: string = ''; // Para almacenar el nombre del usuario
  
  constructor(private router: Router, private authService: AuthService) {
    const user = this.authService.getUser(); // Obtiene el usuario desde el servicio
    if (user) {
      this.usuarioNombre = user.name; // Asigna el nombre del usuario
    }
    this.router.navigate(['home/reglamento-profesor']);
  }
    


  segmentChanged($event: any){
    console.log($event.detail.value);
    let direction=$event.detail.value
    this.router.navigate(['home/'+direction])
  }

}


