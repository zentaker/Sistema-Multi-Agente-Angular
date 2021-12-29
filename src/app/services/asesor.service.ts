import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Asesor } from '../models/asesor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  private asesor: Asesor;


  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token')|| '';

  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }

    }
  }

  cargarAsesores() {
    const url = `${base_url}/asesores`;
    //tambien se puede crear una interfase
    return this.http.get(url, this.headers).pipe(
      map( (resp: {ok: boolean, asesores: Asesor[]}) => resp.asesores)
    )
  }
  crearAsesores(asesor: Asesor) {
    const url = `${base_url}/asesores`;
    //tambien se puede crear una interfase
    return this.http.post(url,{asesor}, this.headers);
  }
  actualizarAsesores( _id: string, nombre: string, celular: string, correo: string) {
    const url = `${base_url}/asesores/${_id}`;
    //tambien se puede crear una interfase
    return this.http.put(url,{nombre, celular, correo}, this.headers);
  }
  eliminarAsesores( _id: string) {
    const url = `${base_url}/asesores/${_id}`;
    //tambien se puede crear una interfase
    return this.http.delete(url, this.headers);
  }
}
