import { Component } from '@angular/core';
import { ActividadesService } from '../../../core/services/actividades.service';
import { Actividad } from '../../../core/tipados';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {

  actividades!: Actividad[];
  displayedColumns: string[] = ['codigo', 'titulo', 'tipo', 'fecha', 'direccion', 'reservable', 'asistentes'];

  constructor(private actServicio: ActividadesService) {
    this.actServicio.getAllActividades().subscribe(actividades => this.actividades = this.actividades)
    this.actividades = [
      {
        codigo: "ACT001",
        asistentes: ["Juan", "María"],
        descripcion: "Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.",
        editando: false,
        reservable: true,
        titulo: "Yoga Básico",
        tipo: "Deporte",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT002",
        asistentes: ["Carlos", "Ana", "Luis"],
        descripcion: "Taller de pintura acrílica.",
        editando: true,
        reservable: false,
        titulo: "Pintura Creativa",
        tipo: "Arte",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT003",
        asistentes: [],
        descripcion: "Sesión de meditación guiada.",
        editando: false,
        reservable: true,
        titulo: "Meditación Mindfulness",
        tipo: "Bienestar",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT004",
        asistentes: ["Lucía"],
        descripcion: "Curso introductorio al desarrollo web.",
        editando: true,
        reservable: true,
        titulo: "Web Dev 101",
        tipo: "Tecnología",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT005",
        asistentes: ["Pedro", "Sofía", "Elena"],
        descripcion: "Entrenamiento funcional en grupo.",
        editando: false,
        reservable: true,
        titulo: "Funcional Fit",
        tipo: "Deporte",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT001",
        asistentes: ["Juan", "María"],
        descripcion: "Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.",
        editando: false,
        reservable: true,
        titulo: "Yoga Básico",
        tipo: "Deporte",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT002",
        asistentes: ["Carlos", "Ana", "Luis"],
        descripcion: "Taller de pintura acrílica.",
        editando: true,
        reservable: false,
        titulo: "Pintura Creativa",
        tipo: "Arte",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT003",
        asistentes: [],
        descripcion: "Sesión de meditación guiada.",
        editando: false,
        reservable: true,
        titulo: "Meditación Mindfulness",
        tipo: "Bienestar",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT004",
        asistentes: ["Lucía"],
        descripcion: "Curso introductorio al desarrollo web.",
        editando: true,
        reservable: true,
        titulo: "Web Dev 101",
        tipo: "Tecnología",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      },
      {
        codigo: "ACT005",
        asistentes: ["Pedro", "Sofía", "Elena"],
        descripcion: "Entrenamiento funcional en grupo.",
        editando: false,
        reservable: true,
        titulo: "Funcional Fit",
        tipo: "Deporte",
        img: "imagenes/pexels-pixabay-280221.jpg",
        fecha: "13/0/2025 17:00",
        direccion: ''
      }]
  }

    seleccionarElm(row:any){
    
  }
}
