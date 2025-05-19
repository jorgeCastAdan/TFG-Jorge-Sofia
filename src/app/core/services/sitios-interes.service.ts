import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LugarInteres } from '../tipados';

const BASE_URL = 'sitios' 

@Injectable({
  providedIn: 'root'
})
export class SitiosInteresService {

  constructor(private http: HttpClient) { }

  getAllSitios(){
    return this.http.get<LugarInteres[]>(`${BASE_URL}`)
  }

  getSitio(codigo:string){
    return this.http.get<LugarInteres>(`${BASE_URL}/id/${codigo}`)
  }

}
