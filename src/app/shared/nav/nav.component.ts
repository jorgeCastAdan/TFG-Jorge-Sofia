import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone:true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  auth =  inject(AuthService);

  autorizado:boolean = false;

  icono:string = 'person_off';

  private router = inject(Router)

  @Output() sidenav = new EventEmitter();
  @Output() abrirPerfil = new EventEmitter();


  constructor()
  {
    if(this.auth.getToken()){
      this.icono = 'person';
      this.autorizado = true;
    }

  }

  abrirmenu() {
    this.sidenav.emit()
  }

  perfil(){
    if(this.autorizado){
      this.router.navigate(['editar-perfil'])
    }
    else{
      this.router.navigate(['login'])
    }
    
    this.abrirPerfil.emit()
  }
}
