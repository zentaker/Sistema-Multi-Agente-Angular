import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public imgUrl:any = '';

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService) {
    //this.menuItems = sidebarService.menu;
    this.imgUrl = usuarioService.usuario?.imagenUrl;
    //console.log(this.menuItems)
  }

  ngOnInit(): void {
  }

}
