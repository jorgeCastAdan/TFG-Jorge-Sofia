import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../tipados';

const BASE_URL = 'actividades'

@Injectable({
  providedIn: 'root'
})
/**
 * Clase responsable de realizar llamadas a la api para modificar o consultar la tabla de actividades
 */
export class ActividadesService {

  constructor(private http: HttpClient) { }

  /**
   * Realiza una llamada a la api y otiene todas las actividades
   * @returns Observable con el resultado de la llamada
   */
  getAllActividades() {
    return this.http.get<Actividad[]>(BASE_URL)
  }

  /**
   * realiza una llamada a la api para recuperar una actividad por su codigo
   * @param codigo el codigo de la actividad que se quiere recuperar
   * @returns Observable con la respuesta de la api
   */
  getActividad(codigo: string) {
    return this.http.get<Actividad>(`${BASE_URL}/id/${codigo}`)
  }

  /**
   * realiza una llamada a la api para que inserte o actualize en ase de datos una actividad a partir de un json con sus datos
   * @param body objeto en formato json con los datos de la actividad
   * @returns Observable con la respuesta de la api
   */
  postActividad(body: any) {
    return this.http.post(`${BASE_URL}/nuevo`, body)
  }

  /**
   * realiza una llamada a la api para borrar una actividad
   * @param codigo codigo de la actividad que se quiere borrar
   * @returns observable con la respuesta de la api
   */
  deleteActividad(codigo: string) {
    return this.http.delete(`${BASE_URL}/borrar/${codigo}`)
  }
}
