import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR from 'jsqr';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camara-alumno',
  templateUrl: './camara-alumno.component.html',
  styleUrls: ['./camara-alumno.component.scss'],
})
export class CamaraAlumnoComponent implements OnInit {
  scannedResult: string | null = null;
  imageDataUrl: string | null = null;

  constructor(private alertController: AlertController) {} // Inyecta el AlertController

  async takePicture() {
    // Abrir la cámara y capturar una imagen
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,  // Para obtener la imagen como Data URL
      source: CameraSource.Camera,  // Usa la cámara para capturar la imagen
    });

    // Verificar que image.dataUrl no sea undefined
    if (image.dataUrl) {
      // Asignar la URL de la imagen capturada para mostrarla en la UI
      this.imageDataUrl = image.dataUrl;

      // Convertir la URL de la imagen a un objeto Image y procesarla
      const imageElement = new Image();
      imageElement.src = image.dataUrl;

      imageElement.onload = async () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          console.error('No se pudo obtener el contexto del canvas');
          return;
        }

        // Dibujar la imagen en el canvas
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        // Obtener los datos de la imagen en formato Uint8ClampedArray
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Usar jsQR para detectar el código QR
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          // Si se detecta un código QR, mostrar el contenido
          this.scannedResult = code.data;
          console.log('Código QR detectado:', code.data);

          // Mostrar alerta con el contenido del código QR
          await this.showAlert('Escaneo exitoso', code.data);
        } else {
          console.log('No se detectó ningún código QR');
          this.scannedResult = 'No se detectó ningún código QR';
        }
      };
    } else {
      console.error('La imagen capturada no tiene un dataUrl válido');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message, // Solo el contenido del código QR
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {}
}
