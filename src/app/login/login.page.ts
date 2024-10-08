import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { RecuperarContrasenaComponent } from '../recuperar-contrasena/recuperar-contrasena.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController, private modalController: ModalController) { }

  async login() {
    if (!this.email && !this.password) {
      this.showToast('Por favor, ingresa el email y la contraseña');
    } else if (!this.email) {
      this.showToast('Por favor, ingresa el email');
    } else if (!this.password) {
      this.showToast('Por favor, ingresa la contraseña');
    } else {
      this.authService.login(this.email, this.password).subscribe(user => {
        if (user) {
          if (user.email.endsWith('@duocuc.cl')) {
            this.router.navigate(['/home-alumno']); 
          } else if (user.email.endsWith('@profesor.duocuc.cl')) {
            this.router.navigate(['/home']); 
          } else if (user.email.endsWith('@admin.cl')) {
            this.router.navigate(['/home-admin']); 
          }
        } else {
          this.showToast('Credenciales incorrectas'); 
        }
      });
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



  async goToRecuperarContrasena() {
    const modal = await this.modalController.create({
      component: RecuperarContrasenaComponent
    });
    return await modal.present();
  }
}


