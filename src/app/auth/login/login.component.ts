import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.Component.css'],
})
export class LoginComponent implements OnInit  {
  public formSubmitted = false;
  public auth2: any;

  public LoginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(localStorage.getItem('email')|| '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,]),
      remember: new FormControl(false),
    } );


  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) {

              }
  ngOnInit(): void {
    this.renderButton();
  }


  login() {

    this.usuarioService.login(this.LoginForm.value).subscribe( resp => {
      if(this.LoginForm.get('remember')?.value){
        //quiere que recordemos su cuenta
        localStorage.setItem('email', this.LoginForm.get('email')?.value);
      } else {
        //no quiere que recordemos su contrasenia
        localStorage.removeItem('email');

      }


       //mover al dasboard
       this.router.navigateByUrl('/')
       console.log(this.LoginForm.value);
    }, (err) => {
      //si sucede un error
      Swal.fire('Error', err.error.msg, 'error')
    })
    console.log(this.LoginForm.value);
    //this.router.navigateByUrl('/');
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',

    });
    this.startApp();
  }
  startApp(){
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '764564161907-28umt9qjo4480sb89dg68sfjakmkn5hq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };
  attachSignin(element:any) {

    this.auth2.attachClickHandler(element, {},
        (googleUser:any)=> {
           const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
           this.usuarioService.loginGoogle(id_token).subscribe(resp => {
             //para que angular no pierda el control del ciclo de vida
             console.log(resp);
             this.ngZone.run( ()=> {
                 //mover al dasboard
           this.router.navigateByUrl('/')

             })




           });

        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
