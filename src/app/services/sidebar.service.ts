import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];
  cargarmenu( ){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    if(this.menu.length === 0) {
      //TODO: rediccionar al login
    }
  }


}

