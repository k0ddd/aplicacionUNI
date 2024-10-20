import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage {

  constructor(private router: Router, public alertaSalida:AlertController) {}

  // Controla la navegación entre las secciones
  segmentChanged($event: any){
    console.log($event.detail.value);
    let direction = $event.detail.value;
    this.router.navigate([`home-admin/${direction}`]);
  }

  async presentAlert(){
    const alert = await this.alertaSalida.create({
      header: 'USTED HA CERRADO SESION',
      message: 'Para volver a iniciar sesion reingrese sus credenciales',
      buttons: ['OK']
    });
    await alert.present();
}  
}
