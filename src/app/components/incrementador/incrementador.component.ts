import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
    `
          .is-red {
        border-color: #dc3545;
      }
    `
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  //los outputs son de tipo event emiter son una funcion
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter(); //nesesita saber que infurmacion fluye

  //renombrar el argumento
  //@Input('valor') progreso: number = 50;


  cambiarValor( valor:number) {
    if(this.progreso >= 100 && valor >=0) {
      this.valorSalida.emit(100)
      return this.progreso = 100;
    }
    if(this.progreso <= 0 && valor <0) {
      this.valorSalida.emit(0)
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    return this.valorSalida.emit(this.progreso)

  }
  onChange(nuevoValor:number):any {
/*     if(nuevoValor >= 100) {
      this.progreso = 100;
    } else if(nuevoValor <= 0) {
      this.progreso = 0;
    }else {
      this.valorSalida.emit(nuevoValor);

    } */

    this.progreso = nuevoValor;
    this.valorSalida.emit(this.progreso);






  }

  constructor() { }
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`

  }


}
