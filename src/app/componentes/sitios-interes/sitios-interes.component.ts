import { Component} from '@angular/core';
import { MapaComponent } from "./mapa/mapa.component";
import { MenuService } from '../../core/services/menu-service.service';
import { LugarInteres } from '../../core/tipados';
import { NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { SitiosInteresService } from '../../core/services/sitios-interes.service';

@Component({
  selector: 'app-sitios-interes',
  standalone:true,
  imports: [MapaComponent, NgFor, MatCardModule, MatIconModule],
  templateUrl: './sitios-interes.component.html',
  styleUrl: './sitios-interes.component.css'
})
export class SitiosInteresComponent{


  data!: LugarInteres[];

  constructor(private http: SitiosInteresService)
  {
    this.http.getAllSitios().subscribe( sitios => 
      this.data = sitios
    )
  }
  /**
  * esto es una prueba para git desde angular
  */
  irAtextoMarcador(nombreLugar: string) {
    let contenido = document.getElementById(nombreLugar);
    contenido?.scrollIntoView({behavior:'smooth', block:'center'})

    contenido?.classList.add('resaltadoCard');

    setTimeout(() => {
      contenido?.classList.remove('resaltadoCard');
    }, 1500);
  }

  /**
   * Al estar el codigo dentro de un at-drawer-container, no se puede
   * realizar el scrollTo con el window, como de manera normal, ya que
   * el scroll aparece solo en el drawer y no anivel de la pagina entera
   */
  volverMapa(){
    let contenido = document.getElementById('contenidoWeb');
    contenido?.scrollTo({top:0, behavior:'smooth'});
  }
}
