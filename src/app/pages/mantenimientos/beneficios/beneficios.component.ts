import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/models/beneficio.model';
import { BeneficioService } from 'src/app/services/beneficio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styles: [
  ]
})
export class BeneficiosComponent implements OnInit {
  public beneficios: Beneficio[]= [];
  public cargando: boolean = true;


  constructor(private beneficiosService:BeneficioService) { }

  ngOnInit(): void {
    this.cargarbeneficios();
  }
  cargarbeneficios() {
    this.cargando = true;
    this.beneficiosService.cargarBeneficios().subscribe(beneficios => {
      this.cargando = false;
      this.beneficios = beneficios;
    })
  }
  guardarCambios(beneficio: Beneficio){
    this.beneficiosService.actualizarBeneficio(beneficio._id,beneficio.nombre, beneficio.detalle ).subscribe(
      resp => {
        Swal.fire('Actualizado', beneficio.nombre, 'success')
      }
    )
    console.log(beneficio);

  }
  eliminarBeneficio(beneficio:Beneficio) {
    this.beneficiosService.eliminarbeneficio(beneficio._id).subscribe(
      resp => {
        Swal.fire('Borrado', beneficio.nombre, 'success')
      }
    )
    console.log(beneficio);
  }

}
