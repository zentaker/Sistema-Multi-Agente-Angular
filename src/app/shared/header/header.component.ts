import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
  .cursor{
    cursor: pointer;
  }

  `
  ]
})
export class HeaderComponent  {
  public imgUrl:any = '';
  public nombre:any = '';
  public email:any = '';



  constructor(private usuarioService: UsuarioService) {
    this.imgUrl = usuarioService.usuario?.imagenUrl;
    this.nombre = usuarioService.usuario?.nombre;
    this.email = usuarioService.usuario?.email;

  }

  logout() {
    this.usuarioService.logout();
  }



}
