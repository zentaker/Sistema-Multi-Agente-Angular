import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import {validarPassword}from './validaccionPassword'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .login-register {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 100%;
        width: 100%;
        padding: 10% 0;
        position: fixed;
      }

      .login-box {
        width: 400px;
        margin: 0 auto;
      }
      .login-box .footer {
        width: 100%;
        left: 0px;
        right: 0px;
      }
      .login-box .social {
        display: block;
        margin-bottom: 30px;
      }

      #recoverform {
        display: none;
      }

      .login-sidebar {
        padding: 0px;
        margin-top: 0px;
      }
      .login-sidebar .login-box {
        right: 0px;
        position: absolute;
        height: 100%;
      }
    `,
  ],
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl('Walter Palomino', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('walter@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required,]),
      password2: new FormControl('123456', [Validators.required]),
      terminos: new FormControl(false, Validators.requiredTrue)
    }, {
    validators: validarPassword
  }  );
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router  ) {}


  //metodo para capturar la informacion
  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);


    if (this.registerForm.invalid) {
      return
    }

    //realizar el posteo si es valido
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
      //navegar al dashboard
      this.router.navigateByUrl('/');
    }, (err) => {
      //si sucede un error
      Swal.fire('Error', err.error.msg, 'error')
    });

    //solucion para no crear una directiva aparte
 /*    if (this.registerForm.valid && !this.pwdNovalidas() ) {
      console.log('posteando formulario')
    } else {
      console.log('Formulario no es correcto')
      this.registerForm.controls.password2.setErrors({NoEsIgual:true})
    } */

  }
  campoNoValido(campo: string):boolean {

    //no se esta cambiando el status del formulario
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }

  }
  contraseniasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted  ) {
      return true;
    } else {
      return false;
    }

  }
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }
  passwordsIguales(pass1Name: string, pass2Name: string){

    return(formGroup: FormGroup )=> {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsigual: true})
      }

    }

  }


}
