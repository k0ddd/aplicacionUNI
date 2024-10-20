import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CodigoqrComponent } from '../codigoqr/codigoqr.component';
import { ProfesorPerfilComponent } from '../profesor-perfil/profesor-perfil.component';
import { HistorialClasesComponent } from '../historial-clases/historial-clases.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'codigoqr',
        component: CodigoqrComponent
      },
      {
        path:'historial-clases',
        component: HistorialClasesComponent
      },
      {
        path:'profesor-perfil',
        component: ProfesorPerfilComponent
      }
    ]
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
