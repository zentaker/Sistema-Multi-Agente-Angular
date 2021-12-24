import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interfaces';
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
  get token(): string {
    return localStorage.getItem('token')|| '';

  }
  get uid(): string {
    return this.usuario?.uid || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }

    }
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

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe( map((resp:any)=> {

      //centralizar la informacion de los usuarios
      console.log(resp);
      //destructuring del objeto usuario
      const {email, google, nombre, role,img='', uid} = resp.usuario;

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
  actualizarPerfil(data: {email: string, nombre: string, role:any}) { // una mejor manera es de crear una interfaz

    data = {
      ...data,
      role: this.usuario?.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })

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
  cargarUsuarios(desde: number =0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    //tambien se puede crear una interfase
    return this.http.get<cargarUsuario>(url, this.headers).pipe(
      //para retrasar la carga
      //delay(1000),
      map(resp => {
        const usuarios = resp.usuarios.map(
          user=> new Usuario(user.nombre, user.email,'', user.img, user.google, user.role,user.uid ))
        return {
          total: resp.total,
          usuarios
        };
      })
    )
    //return this.http.get<{total:number, usuarios:Usuario[]}>(url, this.headers);


  }
}
