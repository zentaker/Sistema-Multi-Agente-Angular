import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-forminterfaces';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario | undefined;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {

    //solo se ejecuta una vez
    this.googleInit();
  }


  googleInit() {
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '764564161907-a03s3i34o06jhhemfn2a1drbq9p0gtem.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });

    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(()=> {

      this.ngZone.run(()=> {

        this.router.navigateByUrl('/login');

      })
    });
  }

  //validar token
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token')|| '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe( map((resp:any)=> {

      //centralizar la informacion de los usuarios
      console.log(resp);
      //destructuring del objeto usuario
      const {email, google, nombre, role,img, uid} = resp.usuario;

      //creacion de la instancia
      this.usuario = new Usuario(nombre,email, '', img , google, role, uid)

      //llamar a un metodo de un modelo
      //this.usuario.imprimirUsuario();
      localStorage.setItem('token', resp.token);
      return true;

      //atrapa el error y regresa un nuevo obserbable con false para que no pase la autentificacion
    }), catchError(error => of(false)))
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      map((resp: any) =>{
        localStorage.setItem('token', resp.token)
        console.log(resp);
        return resp.usuario
      })
    );

  }
  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData).pipe(
      map((resp: any) =>{
        localStorage.setItem('token', resp.token)
        console.log(resp);
        return resp.usuario
      })
    );

  }
  loginGoogle(token: any) {

    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      map((resp: any) =>{
        localStorage.setItem('token', resp.token)
        console.log(resp);
        return resp.usuario
      })
    );

  }
}
