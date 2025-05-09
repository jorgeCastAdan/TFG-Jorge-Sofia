import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Info } from '../tipados';

const BASE_URL = 'informacion'

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private http: HttpClient) { }

  getInfo(){
    return this.http.get<Info[]>(`${BASE_URL}`)
  }
}
