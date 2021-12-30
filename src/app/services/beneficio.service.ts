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
}
