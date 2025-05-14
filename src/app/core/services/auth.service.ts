import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../tipados';
import { SesionesService } from './sesiones.service';
import { UsuarioService } from './usuario.service';
import {  Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string;

  usuario: any;

  cookies = inject(CookieService)

  sesionService = inject(SesionesService)

  usService = inject(UsuarioService)

  constructor() {
    this.token = this.cookies.get('token')
    this.getUsuario().subscribe(resultado => {
        this.usuario = resultado
    })
  }

  getUsuario() :Observable<any> {
    if(this.token){
      return this.sesionService.getSesion(this.token).pipe(
        switchMap(sesion => this.usService.getUsuario(sesion.email))
      )
    }
    else{
      return of(0)
    }
  }

  setUsuario(usuario: any) {
    this.usuario = usuario
  }

  createToken(email: string) {
    let token = uuidv4()
    this.cookies.set('token', token, 28)
    let ttl = this.calcularTTL()
    this.sesionService.createSesion({ token: token, email: email, ttl: ttl }).subscribe()
  }

  cerrarSesion() {
    this.sesionService.deleteSesion(this.token).subscribe()
    this.cookies.delete('token')
  }

  calcularTTL() {
    let fechaActual = Math.floor(Date.now() / 1000)
    let segundos30Dias = 30 * 24 * 60 * 60

    return fechaActual + segundos30Dias;
  }
}
