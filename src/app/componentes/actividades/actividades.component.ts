import { Component, inject } from '@angular/core';
import { ActividadesService } from '../../core/services/actividades.service';
import { Actividad } from '../../core/tipados';
import { NgFor } from '@angular/common';
import { CortarDescPipe } from './cortar-desc.pipe';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-actividades',
  standalone:true,
  imports: [NgFor, CortarDescPipe, MatDividerModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  private auth = inject(AuthService)

  todasActividades: boolean = true;

  actividades:Actividad[];

  actividadesUsuario: Actividad[] = []

  email: string= this.auth.usuario?.email!;

  constructor(private http:ActividadesService, private router:Router){
    this.actividades = []
    this.http.getAllActividades().subscribe(actividadesBd => {this.actividades = actividadesBd; this.actividadesUsuario = actividadesBd})
  }

  abrirActividad(codigo: string){
    this.router.navigate(['/actividad', codigo])
  }

  misActividades(){
    this.todasActividades = false
    this.actividadesUsuario = this.actividades.filter(act => act.asistentes.includes(this.email))
  }

  todasActividadesMostrar(){
    this.todasActividades = true
    this.actividadesUsuario = this.actividades
  }
  
}
