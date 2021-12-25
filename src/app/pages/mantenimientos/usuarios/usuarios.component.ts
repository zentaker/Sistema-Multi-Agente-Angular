import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number =0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number =0;
  public cargando: boolean = true;


  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

  }
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })

  }
  cambiarPagina(valor: number) {
    this.desde += valor;

    //el desde no puede ser menos a 0
    if(this.desde<0){
      this.desde = 0;
    } else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();


  }
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( resp => {

          this.usuarios = resp;

        });
  }
  eliminarUsuario(usuario: Usuario){

    console.log(usuario);
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarusuario(usuario);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
