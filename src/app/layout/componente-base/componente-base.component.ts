import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { NavComponent } from "../../shared/nav/nav.component";
import { Router, RouterOutlet } from '@angular/router';
import { MenuService } from '../../core/services/menu-service.service';
import { NgFor } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

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

  abrirMenu() {
    this.drawer.toggle()
  }

  cerrarMenu() {
    this.drawer.close()
  }

  cambiarRuta(ruta: any) {
    this.router.navigate([ruta]);
    this.drawer.close();
  }
}
