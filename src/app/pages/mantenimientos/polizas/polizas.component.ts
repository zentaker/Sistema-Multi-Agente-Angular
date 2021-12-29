import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';
import { PolizaService } from 'src/app/services/poliza.service';

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


}
