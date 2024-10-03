import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { RecuperarContrasenaComponent } from '../recuperar-contrasena/recuperar-contrasena.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string='';
  password: string='';

  constructor(private router: Router, private toastController: ToastController, private modalController: ModalController) { }

  ngOnInit() {
  }
  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  ingresar(){
    if (!this.email && !this.password) {
      this.showToast('Por favor, ingresa el email y la contraseña');
    } else if (!this.email) {
      this.showToast('Por favor, ingresa el email');
    } else if (!this.password) {
      this.showToast('Por favor, ingresa la contraseña');
    } else {
      // Si los campos están completos, navegamos al home
      this.router.navigate(['/home']);
    }
  }


  async goToRecuperarContrasena() {
    const modal = await this.modalController.create({
      component: RecuperarContrasenaComponent
    });
    return await modal.present();
  }
}


