import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../tipados';

const BASE_URL = 'usuarios'

@Injectable({
  providedIn: 'root'
})
/**
 * Clase responsable de las llamadas ala api para consultar o modificar la tabla de usuarios
 */
export class UsuarioService {

  constructor(private http: HttpClient) { }

  /**
   * Llamada a la api para recuperar los datos de un usuario por email
   * @param email email del usuario que se quiere recuperar
   * @returns Observable con la respuesta de la api
   */
  getUsuario(email:string){
    return this.http.get<Usuario>(`${BASE_URL}/email/${email}`)
  }
  
  /**
   * Llaada a la api para insertar o modificar un usuario. Se inserta si el email no existe en la base de datos, en caso contrario hace un update
   * @param body datos del usuario que se quiere crear o modificar
   * @returns Observable con la respuesta de la api
   */
  postUsuario(body: any){
    return this.http.post(`${BASE_URL}/nuevo`, body)
  }

  /**
   * Llamada a la api para recuperar todos los usuarios
   * @returns Observable con la respuesta de la api
   */
  getAllUsuarios(){
    return this.http.get<Usuario[]>(BASE_URL)
  }

  /**
   * Llamada a la api para barrar un usuario de la base de datos
   * @param email email del usuario que se quiere eliminar
   * @returns Observable con la respuesta de la api
   */
  deleteUsuario(email:string){
    return this.http.delete(`${BASE_URL}/borrar/${email}`)
  }
}
