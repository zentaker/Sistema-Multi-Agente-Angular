import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../interfaces/file-upload.interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor(private http: HttpClient) { }

  //recibir los argumentos para subir la fotogrtafia
  actualizarFoto(archivo: File, tipo: 'usuarios'|'polizas'|'asesores', id:string) {
    const url = `${base_url}/upload/${tipo}/${id}`;
      const formData: FormData = new FormData();
      formData.append('imagen', archivo);

      return this.http.put(url,formData, {
        headers: {
          'x-token': localStorage.getItem('token')||''
        }

      }).pipe(
        map(resp => {
          console.log(resp)
          return resp
        })
      )

  }

}
