import { Component} from '@angular/core';
import { MapaComponent } from "./mapa/mapa.component";
import { CommonModule } from '@angular/common';
import { LugarInteres } from '../../core/tipados';
import { NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { SitiosInteresService } from '../../core/services/sitios-interes.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Componente correspondiente a la pestaña de sitios de interes de la web
 */
@Component({
  selector: 'app-sitios-interes',
  standalone:true,
  imports: [MapaComponent, NgFor, MatCardModule, MatIconModule, CommonModule, NgFor, ReactiveFormsModule, MatFormFieldModule],
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
   * Al pulsar un marcador la vista de la pagina se mueve a donde esta dicho arcador, añadiendole un resaltado que desaparece a los 2 segundos
   * @param nombreLugar el nombre de la clase del parrafo donde se encuentra la descripcion del marcador
   */
  irAtextoMarcador(nombreLugar: string) {
    let contenido = document.getElementById(nombreLugar);
    contenido?.scrollIntoView({behavior:'smooth', block:'center'})

    contenido?.classList.add('resaltadoCard');

    setTimeout(() => {
      contenido?.classList.remove('resaltadoCard');
    }, 2000);
  }

  /**
   * Al pulsar un boton la vista de la pagina vuelve al inicio
   */
  volverMapa(){
    let contenido = document.getElementById('contenidoWeb');
    contenido?.scrollTo({top:0, behavior:'smooth'});
  }
}
