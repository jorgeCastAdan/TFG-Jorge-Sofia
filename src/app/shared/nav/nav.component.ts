import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone:true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  auth =  inject(AuthService);

  autorizado:boolean = false;

  private router = inject(Router)

  @Output() sidenav = new EventEmitter();
  @Output() abrirPerfil = new EventEmitter();


  constructor()
  {
    if(this.auth.getToken()){
      this.autorizado = true;
    }

  }

  abrirmenu() {
    this.sidenav.emit()
  }

  perfil(){
    this.router.navigate(['login'])
    this.abrirPerfil.emit()
  }

  editar(){
    this.router.navigate(['editar-perfil'])
    this.abrirPerfil.emit()
  }

  cerrar(){
    this.auth.cerrarSesion()
    this.abrirPerfil.emit()
    window.location.reload()
  }
}
