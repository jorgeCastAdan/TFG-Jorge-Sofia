import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../tipados';

const BASE_URL = 'usuarios'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuario(email:string){
    return this.http.get<Usuario>(`${BASE_URL}/email/${email}`)
  }
  
  postUsuario(body: any){
    return this.http.post(`${BASE_URL}/nuevo`, body)
  }

  getAllUsuarios(){
    return this.http.get<Usuario[]>(BASE_URL)
  }
}
