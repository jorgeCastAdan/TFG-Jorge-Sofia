import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LugarInteres, MenuItem } from '../tipados';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private path = `./menu.json`;

  constructor(private http: HttpClient) { }

  recuperarMenu(): Observable<MenuItem[]>{
    return this.http.get<MenuItem[]>(this.path);
  }
}
