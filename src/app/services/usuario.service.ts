import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
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
  get rol(): 'ADMIN_ROLE'| 'USER_ROLE'|'DEV_ROLE' |'BROKER_ROLE' {
    return this.usuario.role;

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
        client_id: '764564161907-28umt9qjo4480sb89dg68sfjakmkn5hq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });

    });
  }
  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
      localStorage.setItem('menu', JSON.stringify(menu));

  }


  logout() {

    localStorage.removeItem('menu');
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
    }).pipe( tap((resp:any)=> {
      this.guardarLocalStorage(resp.token, resp.menu);


      //atrapa el error y regresa un nuevo obserbable con false para que no pase la autentificacion
    }), map( resp=> {


      //centralizar la informacion de los usuarios
      console.log(resp);
      //destructuring del objeto usuario
      const {email, google, nombre, role,img='', _id} = resp.usuario;

      //creacion de la instancia
      this.usuario = new Usuario(nombre,email, '', img , google, role, _id)

      //llamar a un metodo de un modelo
      //this.usuario.imprimirUsuario();
      this.guardarLocalStorage(resp.token, resp.menu);
      return true;
    }), catchError(error => of(false)))
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      map((resp: any) =>{
        this.guardarLocalStorage(resp.token, resp.menu);


        console.log(resp);
        return resp.usuario
      })
    );

  }
  actualizarPerfil(data: {email: string, nombre: string, role:any}) { // una mejor manera es de crear una interfaz

    data = {
      ...data,
      role: this.usuario?.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)

  }
  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData).pipe(
      map((resp: any) =>{
        this.guardarLocalStorage(resp.token, resp.menu);

        console.log(resp);
        return resp.usuario
      })
    );

  }
  loginGoogle(token: any) {

    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      map((resp: any) =>{
        this.guardarLocalStorage(resp.token, resp.menu);
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
      tap(resp => {
        console.log(resp.usuarios)

        const usuarios = resp.usuarios.map(
          user=> new Usuario(user.uid ,user.nombre, user.email,'', user.google,  user.role, user.leed, user.img,))
        return {
          total: resp.total,
          usuarios
        };
      })
    )
    //return this.http.get<{total:number, usuarios:Usuario[]}>(url, this.headers);


  }
  eliminarusuario(usuario: Usuario) {

    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);


  }
  guardarUsuario(usuario: Usuario) {


    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)

  }
}
