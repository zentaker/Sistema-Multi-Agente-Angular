import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent {
  public imgUrl:any = '';

  constructor(private usuarioService: UsuarioService) {
    this.imgUrl = usuarioService.usuario?.imagenUrl;
  }
  logout() {
    this.usuarioService.logout();
  }



}
