import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cobertura } from '../models/cobertura.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {


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

  cargarCoberturas() {
    const url = `${base_url}/coberturas`;
    //tambien se puede crear una interfase
    return this.http.get(url, this.headers).pipe(
      map( (resp: {ok: boolean, coberturas: Cobertura[]}) => resp.coberturas)
    )
  }


}
