import { Component, OnInit } from '@angular/core';
import { Asesor } from 'src/app/models/asesor.model';
import { AsesorService } from 'src/app/services/asesor.service';

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

}
