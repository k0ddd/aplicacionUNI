import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage  {
  
    constructor(private router: Router) {
      this.router.navigate(['home-alumno/historial-asistencia'])
    }
    segmentChanged($event: any){
      console.log($event.detail.value);
      let direction=$event.detail.value
      this.router.navigate(['home-alumno/'+direction])
    }
  }
  