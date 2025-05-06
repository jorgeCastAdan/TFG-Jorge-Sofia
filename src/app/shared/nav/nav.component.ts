import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone:true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  private router = inject(Router)

  @Output() sidenav = new EventEmitter();
  @Output() abrirPerfil = new EventEmitter();


  constructor()
  {
  }

  abrirmenu() {
    this.sidenav.emit()
  }

  perfil(){
    this.router.navigate(['editar-perfil'])
    this.abrirPerfil.emit()
  }
}
