import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAlumnoPage } from './home-alumno.page';
import { HistorialAsistenciaComponent } from '../historial-asistencia/historial-asistencia.component';


const routes: Routes = [
  {
    path: '',
    component: HomeAlumnoPage,
    children:[
      {
        path:'historial-asistencia',
        component: HistorialAsistenciaComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAlumnoPageRoutingModule {}
