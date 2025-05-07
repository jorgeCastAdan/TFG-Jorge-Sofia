import { Component, inject, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { NavComponent } from "../../shared/nav/nav.component";
import { Router, RouterOutlet } from '@angular/router';
import { MenuService } from '../../core/services/menu-service.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-componente-base',
  standalone:true,
  imports: [NavComponent, MatSidenavModule, RouterOutlet, NgFor, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './componente-base.component.html',
  styleUrl: './componente-base.component.css'
})
export class ComponenteBaseComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  data: any;

  router = inject(Router)

  cargando:boolean = true;

  constructor(private servicioMenu: MenuService){
    this.servicioMenu.recuperarMenu().subscribe( items => this.data = items);


  }

  abrirMenu() {
    this.drawer.toggle()
  }

  cerrarMenu(){
    this.drawer.close()
  }

  cambiarRuta(ruta:any){
    this.router.navigate([ruta]);
    this.drawer.close();
  }
}
