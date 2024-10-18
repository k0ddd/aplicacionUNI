import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAdminPage } from './home-admin.page';
import { CrearClaseComponent } from '../crear-clase/crear-clase.component';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminPage,
    children:[
      {
        path:'crear-clase',
        component: CrearClaseComponent
      },
      {
        path:'crear-usuario',
        component: CrearUsuarioComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdminPageRoutingModule {}
