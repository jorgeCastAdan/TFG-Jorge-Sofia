import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../../core/tipados';
import { ActividadesService } from '../../../core/services/actividades.service';
import Swal from 'sweetalert2';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actividad',
  standalone:true,
  imports: [MatSnackBarModule],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent {

  actividad!:Actividad;
  fondoUrl: string;

  constructor(
    private route:ActivatedRoute, 
    private actServicio: ActividadesService,
    private router:Router,
    private toast:MatSnackBar
  )
  {
    this.route.paramMap.subscribe( params => {
      let codigo:string = params.get('codigo')!
      this.actServicio.getActividad(codigo).subscribe( act => this.actividad = act)
    })

    this.actividad = {
      codigo: "ACT001",
      asistentes: ["Juan", "María"],
      descripcion: "Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.Clase de yoga para principiantes.",
      editando: false,
      reservable: true,
      titulo: "Yoga Básico",
      tipo: "Deporte",
      img: "imagenes/pexels-pixabay-280221.jpg",
      fecha: "13/5/2025 17:00",
      direccion:'Calle sin fin 4'
    }

    this.fondoUrl = `/${this.actividad.img}`
  }

  participar(){
    Swal.fire({
      title:"Participación",
      text:"¿Está seguro que quiere participar en esta actividad? Si participa se le podra intentar contactar en caso de no asistir a la actividad",
      icon:"info",
      showCancelButton:true,
      confirmButtonText:"¡Participar!",
      cancelButtonText:"Cerrar"
    }).then( resultado => {
      if(resultado.isConfirmed){
        // api
        this.toast.open('¡Participación confirmada!', 'Cerrar', {duration:1500, horizontalPosition:'center', verticalPosition:'bottom'})
        this.router.navigate(['/actividades'])
      }
    })
  }
}
