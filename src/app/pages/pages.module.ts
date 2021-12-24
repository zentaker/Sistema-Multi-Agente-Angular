import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module.ts.module';

import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PolizasComponent } from './mantenimientos/polizas/polizas.component';
import { BeneficiosComponent } from './mantenimientos/beneficios/beneficios.component';
import { CoberturasComponent } from './mantenimientos/coberturas/coberturas.component';
import { AsesoresComponent } from './mantenimientos/asesores/asesores.component';


@NgModule({
  declarations: [
    DasboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    PolizasComponent,
    BeneficiosComponent,
    CoberturasComponent,
    AsesoresComponent,
  ],
  exports: [
    DasboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ChartsModule,
    ReactiveFormsModule

  ],
})
export class PagesModule {}
