import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.perfilForm = new FormGroup({
      nombre: new FormControl('Alessandro Neyra', Validators.required),
      email: new FormControl('dritus96@gmail.com', [Validators.required, Validators.email])
    })
  }

  actualizarPerfil() {
    console.log(this.perfilForm?.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {
      console.log(resp)
    })
  }

}
