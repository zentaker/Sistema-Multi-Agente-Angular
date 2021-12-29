import { Component, OnInit } from '@angular/core';
import { Asesor } from 'src/app/models/asesor.model';
import { AsesorService } from 'src/app/services/asesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styles: [
  ]
})
export class AsesoresComponent implements OnInit {

  public asesores: Asesor[] = [];
  public cargando: boolean = true;

  constructor(private asesorService: AsesorService) { }

  ngOnInit(): void {
    this.cargarAsesores();
  }

  cargarAsesores() {
    this.cargando = true;
    this.asesorService.cargarAsesores().subscribe( asesores => {
      this.cargando = false;
      this.asesores = asesores;
    })
  }
  guardarCambios(asesor: Asesor){
    this.asesorService.actualizarAsesores(asesor._id,asesor.nombre, asesor.celular, asesor.correo ).subscribe(
      resp => {
        Swal.fire('Actualizado', asesor.nombre, 'success')
      }
    )
    console.log(asesor);

  }
  eliminarAsesor(asesor:Asesor) {
    this.asesorService.eliminarAsesores(asesor._id).subscribe(
      resp => {
        Swal.fire('Borrado', asesor.nombre, 'success')
      }
    )
    console.log(asesor);
  }



}
