import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage {

  constructor(private router: Router) {}

  // Controla la navegación entre las secciones
  segmentChanged($event: any){
    console.log($event.detail.value);
    let direction = $event.detail.value;
    this.router.navigate([`home-admin/${direction}`]);
  }
}
