import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public nombre:any = '';
  public email:any = '';
  public id:any ='';
  public imagenSubir!: File;
  public imgUrl:any = '';
  public imgTemp: any = '';
  public google:any ='';

  //de manera publica
  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }
  cambiarImagen(event: any):void {
    this.imagenSubir = event.target.files[0];
    //si el archivo existe se ejecutan las lineas posteriores
    if(!event.target.files[0]){
      return this.imgTemp = undefined;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result

    }





  }
  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


    this.fileUploadService.actualizarFoto(this.imagenSubir,tipo, id).subscribe(
      resp => {
        console.log(resp)
        this.cerrarModal();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se han guardado los cambios',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

}
