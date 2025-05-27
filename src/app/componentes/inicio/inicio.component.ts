import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Info } from '../../core/tipados';
import { InformacionService } from '../../core/services/informacion.service';
import { NgClass, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

/**
 * Componente correspondiente del inicio de la web
 */
@Component({
  selector: 'app-inicio',
  host: {
    ngSkipHydration: '',
  },
  standalone: true,
  imports: [NgFor, MatCardModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  informacion!: Info[];

  constructor(private infoService: InformacionService) {
    this.infoService.getInfo().subscribe((info) => this.informacion = info)
  }

  /**
   * Al pulsar en una imagen del slider mueve la vista de la pagina al parrafo con el contenido de dicha imagen
   * @param titulo titulo de la imagen
   */
  mostrarItem(titulo: string) {
    let contenido = document.getElementById(titulo);
    contenido?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

}
