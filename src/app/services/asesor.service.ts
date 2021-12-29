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


    //return this.http.get<{total:number, usuarios:Usuario[]}>(url, this.headers);

  }
}
