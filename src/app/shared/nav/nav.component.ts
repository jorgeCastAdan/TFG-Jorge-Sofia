import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente con los elementos de la barra de navegacion de la web
 */
@Component({
  selector: 'app-nav',
  standalone:true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  auth =  inject(AuthService);

  private router = inject(Router)

  @Input({required:true}) usuario! : any;
  @Output() sidenav = new EventEmitter();
  @Output() abrirPerfil = new EventEmitter();


  constructor(){}

  /**
   * emite un evento para que se abra el menu
   */
  abrirmenu() {
    this.sidenav.emit()
  }

  /**
   * Cambia la url para redirigir la pagina a la de login y emite un evento para que el componente base lo reciba
   */
  perfil(){
    this.router.navigate(['login'])
    this.abrirPerfil.emit()
  }

  /**
   * Cambia la url para redirigir la pagina a la de editar perfil y emite un evento para que el componente base lo reciba
   */
  editar(){
    this.router.navigate(['editar-perfil'])
    this.abrirPerfil.emit()
  }

  /**
   * Metodo para cuando se cierra sesion, elimina la sesion, emite un evento para que el componente base lo reciba y redirige la pagina a la raiz '/'
   */
  cerrar(){
    this.auth.cerrarSesion()
    this.abrirPerfil.emit()
    window.location.href = '/'
  }
}
