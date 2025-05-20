import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { NavComponent } from "../../shared/nav/nav.component";
import { Router, RouterOutlet } from '@angular/router';
import { MenuService } from '../../core/services/menu-service.service';
import { NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente ase de la web con los elementos que estan presentes siempre
 */
@Component({
  selector: 'app-componente-base',
  standalone: true,
  imports: [NavComponent, MatSidenavModule, RouterOutlet, NgFor, MatButtonModule, MatIconModule],
  templateUrl: './componente-base.component.html',
  styleUrl: './componente-base.component.css'
})
export class ComponenteBaseComponent{
  @ViewChild('drawer') drawer!: MatDrawer;
  data: any;

  router = inject(Router)

  usuario: any = null;

  constructor(private servicioMenu: MenuService, private auth: AuthService) {
    this.servicioMenu.recuperarMenu().subscribe(items => this.data = items);
    this.auth.usuario$.subscribe(us => this.usuario = us);
  }

  /**
   * Abre el menu lateral
   */
  abrirMenu() {
    this.drawer.toggle()
  }

  /**
   * Cierra el menu lateral en caso de estar abierto
   */
  cerrarMenu() {
    this.drawer.close()
  }

  /**
   * Cambia la ruta interna de la web (url)
   * @param ruta ruta a la que va anavegar la web
   */
  cambiarRuta(ruta: any) {
    this.router.navigate([ruta]);
    this.drawer.close();
  }
}
