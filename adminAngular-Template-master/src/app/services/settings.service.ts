import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    //vanila javascrtipt
    this.linkTheme?.setAttribute('href', url);
   }
   changeTheme(theme: string) {
    //hacer la selecion al elemento
    const url = `./assets/css/colors/${theme}.css`;
    //vanila javascrtipt
    this.linkTheme?.setAttribute('href', url);
    //guardar en el local storage lapreferencia
    localStorage.setItem('theme', url);


    this.checkCurrentTheme();

  }
  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    //console.log(links);

    //borrar la clase working
    links.forEach(element => {
      element.classList.remove('working');
      //de manera condicional ver cual es el tema del url actual
      const btnTheme = element.getAttribute('data-theme');
      //comprarlo contra el url
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');

      }


    });

    //agregarla dinamicamente




  }
}
