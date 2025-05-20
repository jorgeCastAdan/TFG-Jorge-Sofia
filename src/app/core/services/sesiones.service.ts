import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sesion } from '../tipados';

const BASE_URL = 'sesion'

@Injectable({
  providedIn: 'root'
})
/**
 * Clase responsale de realizar las llamadas a la api correspondientes a la tala de sesiones
 */
export class SesionesService {

  constructor(private http:HttpClient) { }

  /**
   * Otiene una sesion a partir de un token
   * @param token el token del que se quiere su sesion
   * @returns Observable con la respuesta de la api
   */
  getSesion(token:string){
    return this.http.get<Sesion>(`${BASE_URL}/id/${token}`)
  }

  /**
   * llaada a la api para crear una nueva sesion
   * @param sesion la sesion que se quiere crear en formato json
   * @returns Observable con la respuesta de la api
   */
  createSesion(sesion:any){
    return this.http.post(`${BASE_URL}/nuevo`, sesion)
  }

  /**
   * Elimina una sesion de la ase de datos mediante una llamada a la api
   * @param token el token cuya sesion se quiere eliminar
   * @returns Observable con la respuesta de la api
   */
  deleteSesion(token:string){
    return this.http.delete(`${BASE_URL}/borrar/${token}`)
  }
}
