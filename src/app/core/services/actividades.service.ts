import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../tipados';

const BASE_URL = 'actividades'

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http:HttpClient) { }

  getAllActividades(){
    return this.http.get<Actividad[]>(BASE_URL)
  }

  getActividad(codigo:string){
    return this.http.get<Actividad>(`${BASE_URL}/id/${codigo}`)
  }

  postActividad(body: any){
    return this.http.post(`${BASE_URL}/nuevo`, body)
  }

  deleteActividad(codigo: string){
    return this.http.delete(`${BASE_URL}/borrar/${codigo}`)
  }
}
