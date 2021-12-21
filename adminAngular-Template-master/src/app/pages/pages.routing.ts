 import { Routes, RouterModule } from "@angular/router";
 import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

 const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      //quitar el nombre para la ruta por defecto
      { path: '', component: DasboardComponent, data: {title: 'dasboard'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'Progres Bar'} },
      { path: 'grafica1', component: Grafica1Component, data: {title: 'Grafica'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Tema'} },
      { path: 'promesas', component: PromesasComponent,  data: {title: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'} },

    ],
  },

 ];


 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })

 export class PagesRoutingModule{}
