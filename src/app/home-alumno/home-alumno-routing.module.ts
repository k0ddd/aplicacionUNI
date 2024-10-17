import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAlumnoPage } from './home-alumno.page';
import { HistorialAsistenciaComponent } from '../historial-asistencia/historial-asistencia.component';
import { AlumnoPerfilComponent } from '../alumno-perfil/alumno-perfil.component';
import { CamaraAlumnoComponent } from '../camara-alumno/camara-alumno.component';


const routes: Routes = [
  {
    path: '',
    component: HomeAlumnoPage,
    children:[
      {
        path:'historial-asistencia',
        component: HistorialAsistenciaComponent
      },
      {
        path:'alumno-perfil',
        component: AlumnoPerfilComponent
      },
      {
        path:'camara-alumno',
        component: CamaraAlumnoComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAlumnoPageRoutingModule {}
