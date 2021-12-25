import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true; //es un estandar poner _ cuando es una propiedad privada

  get ocultarModal(){
    return this._ocultarModal;
  }
  abrirModal() {
    this._ocultarModal = false
  }
  constructor() { }
}
