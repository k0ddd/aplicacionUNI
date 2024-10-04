import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
})
export class RecuperarContrasenaComponent  implements OnInit {
  email: string = '';

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {}
  async recuperarContrasena() {
    if (this.email.endsWith('@profesor.duocuc.cl') || this.email.endsWith('@duocuc.cl')){
      const alert = await this.alertController.create({
        header: 'Exito',
        message: 'se ha enviado correctamente el correo para recuperar tu contraseña',
        buttons: ['Aceptar'],
      });
      await alert.present();

      
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ingresa el correo electronico',
        buttons: ['Aceptar'],
      });    
      await alert.present();
    }
  }

}



