import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dasboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {  titulo: 'main', url: '' },
        {  titulo: 'ProgressBar', url: 'progress' },
        {  titulo: 'Graficos', url: 'grafica1' },
        {  titulo: 'Account-settings', url: 'account-settings' },

      ]

    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {  titulo: 'Usuarios', url: 'usuarios' },
        {  titulo: 'Polizas', url: 'polizas' },
        {  titulo: 'Beneficios', url: 'beneficios' },
        {  titulo: 'Coberturas', url: 'coberturas' },
        {  titulo: 'Asesores', url: 'asesores' },

      ]

    }

  ]

  constructor() { }
}
