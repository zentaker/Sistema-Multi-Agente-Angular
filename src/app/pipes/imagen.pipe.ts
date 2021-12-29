import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipos:'usuarios'|'asesores' ): string {
    return 'hola mundo';
  }

}
