import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage  {
  
    constructor(private router: Router,public alertaSalida: AlertController) {
      this.router.navigate(['home-alumno/historial-asistencia'])
    }
    segmentChanged($event: any){
      console.log($event.detail.value);
      let direction=$event.detail.value
      this.router.navigate(['home-alumno/'+direction])
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
  