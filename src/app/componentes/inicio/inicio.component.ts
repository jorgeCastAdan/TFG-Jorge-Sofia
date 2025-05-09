import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Info } from '../../core/tipados';
import { InformacionService } from '../../core/services/informacion.service';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-inicio',
  host: {
    ngSkipHydration: '',
  },
  standalone:true,
  imports: [NgFor, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  informacion!: Info[];

  constructor(private infoService: InformacionService){
    this.infoService.getInfo().subscribe((info)=> this.informacion = info)
  }

  mostrarItem(titulo: string){
    let contenido = document.getElementById(titulo);
    contenido?.scrollIntoView({behavior:'smooth', block:'center'})
  }

}
