import { Pipe, PipeTransform } from '@angular/core';

/**
 * Tuberia para poder recortar un texto si es mas grande de 75 caracteres
 */
@Pipe({
  name: 'cortarDesc'
})
export class CortarDescPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length > 75){
      return value.substring(0, 75) + '...'
    }

    return value
  }

}
