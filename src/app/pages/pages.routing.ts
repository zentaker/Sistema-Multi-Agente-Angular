 import { Routes, RouterModule } from "@angular/router";
 import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";

//mantenimientos
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { AsesoresComponent } from "./mantenimientos/asesores/asesores.component";
import { PolizasComponent } from "./mantenimientos/polizas/polizas.component";
import { PolizaComponent } from "./mantenimientos/polizas/poliza.component";
import { AdminGuard } from "../guards/admin.guard";
import { BeneficiosComponent } from "./mantenimientos/beneficios/beneficios.component";
import { CoberturasComponent } from "./mantenimientos/coberturas/coberturas.component";

 const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      //quitar el nombre para la ruta por defecto
      { path: '', component: DasboardComponent, data: {title: 'dasboard'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'Progres Bar'} },
      { path: 'grafica1', component: Grafica1Component, data: {title: 'Grafica'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Tema'} },

      { path: 'perfil', component: PerfilComponent, data: {title: 'Perfil de Usuario'} },

      //mantenimientos
      { path: 'polizas', component: PolizasComponent, data: {title: 'Mantenimiento de Polizas'} },
      { path: 'poliza/:id', component: PolizaComponent, data: {title: 'Mantenimiento de Polizas'} },
      { path: 'asesores', component: AsesoresComponent, data: {title: 'Mantenimiento de Asesores'} },
      { path: 'beneficios', component: BeneficiosComponent, data: {title: 'Mantenimiento de beneficios'} },
      { path: 'coberturas', component: CoberturasComponent, data: {title: 'Mantenimiento de Asesores'} },


      //rutas de admin
      { path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data: {title: 'Usuarios de la aplicacion'} },


    ],
  },

 ];


 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })

 export class PagesRoutingModule{}
