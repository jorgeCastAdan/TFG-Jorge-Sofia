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
    this.informacion = [
      {
        "codigo": "PRD001",
        "descripcion": "Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.\n\nUn smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.",
        "imagen": "ganador_bolos.jpg",
        "titulo": "Smartphone X100"
      },
      {
        "codigo": "PRD002",
        "descripcion": "Laptop ultradelgada con procesador de alto rendimiento y batería de larga duración.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.\n\nUn smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.Un smartphone de última generación con cámara de alta resolución y pantalla AMOLED.",
        "imagen": "ganador_bolos.jpg",
        "titulo": "Laptop Pro 15"
      },
      {
        "codigo": "PRD003",
        "descripcion": "Auriculares inalámbricos con cancelación de ruido activa y sonido envolvente.",
        "imagen": "ganador_bolos.jpg",
        "titulo": "Auriculares NoiseCancel 500"
      },
      {
        "codigo": "PRD004",
        "descripcion": "Reloj inteligente con monitor de ritmo cardíaco, GPS integrado y resistencia al agua.",
        "imagen": "ganador_bolos.jpg",
        "titulo": "Reloj FitLife"
      }
    ]
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
