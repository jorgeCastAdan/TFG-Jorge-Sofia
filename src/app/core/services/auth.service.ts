import { inject, Injectable } from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cookies = inject(CookieService)

  private token: string;

  constructor() { 
    this.token = this.cookies.get('token')
  }

  
  getToken(){
    return this.token;
  }

  setToken(token:string){
    this.cookies.set('token', token, 30)
  }

  cerrarSesion(){
    this.cookies.delete('token')
  }
}
