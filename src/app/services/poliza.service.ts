import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Poliza } from '../models/poliza.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

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

  cargarPolizas() {
    const url = `${base_url}/polizas`;
    //tambien se puede crear una interfase
    return this.http.get(url, this.headers).pipe(
      map( (resp: {ok: boolean, polizas: Poliza[]}) => resp.polizas)
    )
  }
  crearPolizas(poliza: Poliza) {
    const url = `${base_url}/polizas`;
    //tambien se puede crear una interfase
    return this.http.post(url,poliza, this.headers);
  }
  actualizarPolizas( poliza: Poliza) {
    const url = `${base_url}/polizas/${poliza._id}`;
    //tambien se puede crear una interfase
    return this.http.put(url,poliza, this.headers);
  }
  eliminarPolizas( _id: string) {
    const url = `${base_url}/polizas/${_id}`;
    //tambien se puede crear una interfase
    return this.http.delete(url, this.headers);
  }
}
