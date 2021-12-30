import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';
import { PolizaService } from 'src/app/services/poliza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-polizas',
  templateUrl: './polizas.component.html',
  styles: [
  ]
})
export class PolizasComponent implements OnInit {

  public cargando: boolean = true;
  public polizas: Poliza[] = [];

  constructor(private polizaService: PolizaService,) { }

  ngOnInit(): void {
    this.cargarPolizas();
  }

  cargarPolizas(){
    this.cargando = true;
    this.polizaService.cargarPolizas().subscribe( polizas => {
      this.cargando = false;
      this.polizas = polizas;
      console.log(polizas);
    });

  }
  borrarPoliza(poliza: Poliza){

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${poliza.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.polizaService.eliminarPolizas(poliza._id).subscribe( resp => {
          this.cargarPolizas();
          Swal.fire(
            'Deleted!',
            `${poliza.nombre} se ha borrado`,
            'success'
          );


        })

      }
    })

  }


}
