import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LugarInteres } from '../tipados';

const BASE_URL = 'sitios' 

@Injectable({
  providedIn: 'root'
})
/**
 * Clase responsale de llaar a la api para consultar y eliminar datos de la tabla de sitios de interes
 */
export class SitiosInteresService {

  constructor(private http: HttpClient) { }

  /**
   * Llaada a la api en la que recupera todos los registros de la ase de datos
   * @returns Observable con la respuesta de la api
   */
  getAllSitios(){
    return this.http.get<LugarInteres[]>(`${BASE_URL}`)
  }

  /**
   * Llaada a la api para otener los datos de un sitio en especifico atraves de su codigo
   * @param codigo codigo del sitio que se quiere recuperar
   * @returns Observable con la respuesta de la api
   */
  getSitio(codigo:string){
    return this.http.get<LugarInteres>(`${BASE_URL}/id/${codigo}`)
  }

}
