import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../tipados';
import { SesionesService } from './sesiones.service';
import { UsuarioService } from './usuario.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase responsable de crear los tokens de sesion y de consultar y modificar la tabla de sesiones de la base de datos
 */
export class AuthService {

  token: string;

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  cookies = inject(CookieService)

  sesionService = inject(SesionesService)

  usService = inject(UsuarioService)

  constructor() {
    this.token = this.cookies.get('token')
    this.getUsuario().subscribe(resultado => {
      this.usuarioSubject.next(resultado)
    })
  }

  /**
   * En el caso de que exista un token en las cookies, se realiza una llamada a la api para recuperar la sesion de ese token y el usuario al que le pertenece dicho token
   * @returns Observable de 0 si no existe el token en las cookies o un Observable con la respuesta de la api a obtener los datos de un usuario
   */
  getUsuario(): Observable<any> {
    if (this.token) {
      return this.sesionService.getSesion(this.token).pipe(
        switchMap(sesion => this.usService.getUsuario(sesion.email))
      )
    }
    else {
      return of(0)
    }
  }

  /**
   * Devuelve el valor del atriuto de usuario$
   */
  get usuario(): Usuario | null {
    return this.usuarioSubject.value;
  }

  /**
   * Le asigna valor a la varible de usuario$
   * @param usuario El valor a asignar
   */
  setUsuario(usuario: any) {
    this.usuarioSubject = usuario
  }

  /**
   * crea un token en formato uuid v4, crea una sesion en base de datos con el token y el email del usuario y guarda el token en cookies
   * @param email email del usuario que ha iniciado sesion
   */
  createToken(email: string) {
    let token = uuidv4()
    this.cookies.set('token', token, 28)
    let ttl = this.calcularTTL()
    this.sesionService.createSesion({ token: token, email: email, ttl: ttl }).subscribe()
  }

  /**
   * elimina el token de las cookies y orra la sesion de base de datos
   */
  cerrarSesion() {
    this.sesionService.deleteSesion(this.token).subscribe()
    this.cookies.delete('token', '/')
  }

  /**
   * calcular el tiempo necesario para que la sesion se borre automaticamente en dynamo en 30 dias
   * @returns 
   */
  calcularTTL() {
    let fechaActual = Math.floor(Date.now() / 1000)
    let segundos30Dias = 30 * 24 * 60 * 60

    return fechaActual + segundos30Dias;
  }
}
