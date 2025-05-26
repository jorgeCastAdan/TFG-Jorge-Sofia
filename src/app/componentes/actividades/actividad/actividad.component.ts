import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../../core/tipados';
import { ActividadesService } from '../../../core/services/actividades.service';
import Swal from 'sweetalert2';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente correspondiente de la vista de una actividad en especifico
 */
@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent {

  actividad!: Actividad;
  fondoUrl!: string;
  participando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private actServicio: ActividadesService,
    private router: Router,
    private toast: MatSnackBar,
    private auth: AuthService
  ) {
    this.route.paramMap.subscribe(params => {
      let codigo: string = params.get('codigo')!
      this.actServicio.getActividad(codigo).subscribe(act => {
        this.actividad = act;
        this.fondoUrl = `imagenes/${this.actividad.imagen}`;
        if (this.actividad.asistentes) {
          this.participando = this.actividad.asistentes.some(
            (email: string) => email === this.auth.usuario?.email
          );
        }
      })
    })

  }

  /**
   * Al pulsar esta opcion se muestra un popup para confirmar la participacion, en caso afirmativo, se guarda dicha participacion en la base de datos y se redirige la ventana a todas las actividades de nuevo
   */
  participar() {
    Swal.fire({
      title: "Participación",
      text: "¿Está seguro que quiere participar en esta actividad? Si participa se le podra intentar contactar en caso de no asistir a la actividad",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "¡Participar!",
      cancelButtonText: "Cerrar"
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.actividad.asistentes.push(this.auth.usuario?.email!)

        this.actServicio.postActividad(this.actividad).subscribe()

        this.toast.open('¡Participación confirmada!', 'Cerrar', { duration: 1500, horizontalPosition: 'center', verticalPosition: 'bottom' })
        this.router.navigate(['/actividades'])
      }
    })
  }

  /**
   * En caso de que el usuario ya este participando en esta actividad, aparecera la opcion de dejar de participar. En caso de pulsar esta opcion, salta un popup para confirmar la decisión y en caso afirmativo modifica los datos en base de datos y redirige a la pestaña con todas las actividades
   */
  dejarDeParticipar() {
    Swal.fire({
      title: "Participación",
      text: "¿Está seguro que quiere cancelar la participación en esta actividad?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Cancelar participación",
      cancelButtonText: "Cerrar"
    }).then(resultado => {
      if (resultado.isConfirmed) {

        let asistentesaux = this.actividad.asistentes.filter(email => email !== this.auth.usuario?.email!)

        this.actividad.asistentes = asistentesaux

        this.actServicio.postActividad(this.actividad).subscribe()

        this.toast.open('Participación cancelada', 'Cerrar', { duration: 1500, horizontalPosition: 'center', verticalPosition: 'bottom' })
        this.router.navigate(['/actividades'])
      }
    })
  }
}
