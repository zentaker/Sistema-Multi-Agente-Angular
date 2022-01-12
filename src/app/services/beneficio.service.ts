import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Beneficio } from "../models/beneficio.model";
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  private beneficio: Beneficio;


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

  constructor(private http: HttpClient) { }

  cargarBeneficios() {
    const url = `${base_url}/beneficios`;
    //tambien se puede crear una interfase
    return this.http.get(url, this.headers).pipe(
      map( (resp: {ok: boolean, beneficios: Beneficio[]}) => resp.beneficios)
    )
  }
  crearBeneficio(beneficio: Beneficio) {
    const url = `${base_url}/beneficios`;
    //tambien se puede crear una interfase
    return this.http.post(url,{beneficio}, this.headers);
  }

  actualizarBeneficio( _id: string, nombre: string, detalle: string) {
    const url = `${base_url}/beneficios/${_id}`;
    //tambien se puede crear una interfase
    return this.http.put(url,{nombre, detalle}, this.headers);
  }
  eliminarbeneficio( _id: string) {
    const url = `${base_url}/beneficios/${_id}`;
    //tambien se puede crear una interfase
    return this.http.delete(url, this.headers);
  }






}
