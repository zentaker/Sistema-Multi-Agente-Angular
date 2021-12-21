import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css'
  ]
})
export class ProgressComponent  {
  progreso1: number = 25;
  progreso2: number = 35;

    //getter para enviar el valor como lo nesesitamos
    get getPorcentaje1() { // un get funciona com una variable
      //se imprikme directamente al html
      return`${this.progreso1}%`;
    }
    get getPorcentaje2() {
      return`${this.progreso2}%`;
    }





  constructor() { }


}
