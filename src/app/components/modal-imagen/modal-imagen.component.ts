import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  //de manera publica
  constructor(public modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }

}
