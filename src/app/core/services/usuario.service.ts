import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../tipados';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  datosUsuario(dni:string){
    return this.http.get<Usuario>('')
  }
  
  nuevoUsuario(){}

  comprobarUsuario(){}

}
