import { inject, Injectable } from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../tipados';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cookies = inject(CookieService)

  private token: string;
  usuario!: Usuario;

  constructor(private userService: UsuarioService) { 
    this.token = this.cookies.get('token')
    if(this.token){
      userService.getUsuario(this.token).subscribe((usu => this.usuario = usu))
    }
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
