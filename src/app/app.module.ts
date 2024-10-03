import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CodigoqrComponent } from './codigoqr/codigoqr.component';
import { ReglamentoProfesorComponent } from './reglamento-profesor/reglamento-profesor.component';
import { ProfesorPerfilComponent } from './profesor-perfil/profesor-perfil.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CodigoqrComponent, ReglamentoProfesorComponent, ProfesorPerfilComponent, RecuperarContrasenaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
