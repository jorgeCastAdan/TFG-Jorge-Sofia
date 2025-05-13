import { Component } from '@angular/core';
import { ActividadesService } from '../../core/services/actividades.service';
import { Actividad } from '../../core/tipados';
import { NgFor } from '@angular/common';
import { CortarDescPipe } from './cortar-desc.pipe';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  standalone:true,
  imports: [NgFor, CortarDescPipe, MatDividerModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  actividades:Actividad[];

  constructor(private http:ActividadesService, private router:Router){
    this.actividades = []
    this.http.getAllActividades().subscribe(actividadesBd => this.actividades = actividadesBd)
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
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
      fecha: "13/0/2025 17:00"
    }]
  }

  abrirActividad(codigo: string){
    this.router.navigate(['/actividad', codigo])
  }
  
}
