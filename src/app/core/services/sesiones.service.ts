import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sesion } from '../tipados';

const BASE_URL = 'sesion'

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  constructor(private http:HttpClient) { }

  getSesion(token:string){
    return this.http.get<Sesion>(`${BASE_URL}/id/${token}`)
  }

  createSesion(sesion:any){
    return this.http.post(`${BASE_URL}/nuevo`, sesion)
  }

  deleteSesion(token:string){
    return this.http.delete(`${BASE_URL}/borrar/${token}`)
  }
}
