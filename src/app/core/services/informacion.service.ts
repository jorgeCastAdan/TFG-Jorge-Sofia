import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Info } from '../tipados';

const BASE_URL = 'informacion'

@Injectable({
  providedIn: 'root'
})
/**
 * Clase responsale de realizar las llamadas a la api correspondientes a la clase de iformacion
 */
export class InformacionService {

  constructor(private http: HttpClient) { }

  /**
   * llaada a la api para recibir todos los registros de la tabla de informacion
   * @returns Observable con la respuesta de la api 
   */
  getInfo(){
    return this.http.get<Info[]>(`${BASE_URL}`)
  }
}
