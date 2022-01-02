import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public nombre:any = '';
  public email:any = '';
  public _id:any ='';
  public imagenSubir!: File;
  public imgUrl:any = '';
  public imgTemp: any = '';
  public google:any ='';

  constructor(private usuarioService: UsuarioService,
              private ref: ChangeDetectorRef,
              private ngZone: NgZone,
              private fileUploadService: FileUploadService) {
    this.nombre = usuarioService.usuario?.nombre;
    this.email = usuarioService.usuario?.email;
    this._id = usuarioService.usuario?.uid;
    this.imgUrl = usuarioService.usuario?.imagenUrl;
    this.google = usuarioService.usuario?.google;

  }

  ngOnInit(): void {
    this.perfilForm = new FormGroup({
      nombre: new FormControl(this.nombre, Validators.required),
      email: new FormControl(this.email, [Validators.required, Validators.email])
    })
  }

  actualizarPerfil() {
    console.log(this.perfilForm?.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {
      console.log(resp);

/*       this.ngZone.run( ()=> {
        //mover al dasboard
        this.ref.detectChanges();})
 */


      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se han guardado los cambios',
        showConfirmButton: false,
        timer: 1500
      })
    }, (err)=> {
      console.log(err.error.msg)
      Swal.fire('Error', err.error.msg, 'error')
    })
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


    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this._id).subscribe(
      resp => {
        console.log(resp)
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
